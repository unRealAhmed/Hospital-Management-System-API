const { promisify } = require('util');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');
const createToken = require('../util/createToken');
const Email = require('../util/email');
const { resetHtmlTemplate } = require('../util/resetPasswordTemplate')


// Helper function to send JWT token as a response
const sendTokenResponse = (res, user, statusCode) => {
  // Create a JWT token
  const token = createToken(res, user.userId);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

// Signup Controller
exports.signUp = asyncHandler(async (req, res, next) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || !role) {
    return next(new AppError('Email, password, name, and role are required.', 400));
  }

  const newUser = await User.create({
    email,
    password,
    name,
    role,
  });

  newUser.password = undefined;

  const url = `http://127.0.0.1:3000`;
  let redirectRoute;
  if (role === 'patient') {
    redirectRoute = `${url}/patients/create/${newUser.userId}`;
  } else if (role === 'doctor') {
    redirectRoute = `${url}/doctors/create/${newUser.userId}`;
  }

  // res.redirect(redirectRoute); =>>> this works in browser
  res.json({ redirectRoute })
});

// DELETE FROM Users
// WHERE name = 'Ahmed Sayed';

// LOGIN
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new AppError('Please provide valid email and password.', 400));
  }

  // Find the user by email
  const user = await User.findOne({
    where: { email }
  });

  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  // Check if the provided password matches the stored hashed password
  const isPasswordCorrect = await user.passwordMatching(password, user.password);

  if (!isPasswordCorrect) {
    return next(new AppError('Invalid email or password', 401));
  }

  // Exclude password from the response
  user.password = undefined;

  sendTokenResponse(res, user, 200);
});

//PROTECT ROUTES
exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Get the token from the request's authorization header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // 3) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  // 4) Check if the user associated with the token still exists
  const currentUser = await User.findByPk(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token no longer exists.',
        401
      )
    );
  }

  const tokenIssuedAt = decoded.iat;

  // 5) Check if the user changed the password after the token was issued
  if (currentUser.changedPasswordAfter(tokenIssuedAt)) {
    return next(
      new AppError('User recently changed the password! Please log in again.', 401)
    );
  }

  req.user = currentUser;
  next();
});

// FORGET PASSWORD
exports.forgetPassword = asyncHandler(async (req, res, next) => {
  // 1) Find the user by their email
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return next(new AppError('There is no user with this email address.', 404));
  }

  // 2) Generate a password reset token and save it to the user
  const resetToken = user.createPasswordResetToken();
  await user.save();

  // 3) Construct the reset URL and email it to the user
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
  const html = resetHtmlTemplate(
    req.protocol,
    req.headers.host,
    resetToken,
  );

  // Send the password reset email
  const email = new Email(user, resetURL);

  try {
    await email.sendPasswordResetEmail(html);

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email.',
    });
  } catch (err) {
    console.error(err);

    // Reset user properties and send an error response
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    return next(
      new AppError('There was an error sending the email. Please try again later.', 503)
    );
  }
});

// RESET PASSWORD
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  // 1) Decrypt the token and find the user
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { [Op.gt]: new Date() },
    },
  });

  // 2) Check if the token is valid and not expired
  if (!user) {
    return next(new AppError('Token is invalid or has expired. Please request a new password reset.', 400));
  }

  // 3) Set the new password and clean up the reset token
  user.password = password;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();

  user.password = undefined;

  sendTokenResponse(res, user, 200);
});

// UPDATE PASSWORD
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new AppError('Please provide both values', 400));
  }

  // 1) Find the user by ID and select the password field
  const user = await User.findByPk(req.user.userId);

  // 2) Check if the entered current password is correct
  const isPasswordCorrect = await user.passwordMatching(oldPassword, user.password);

  if (!isPasswordCorrect) {
    return next(new AppError("Your current password is incorrect", 401));
  }

  // 3) Update the user's password with the new one and save the changes
  user.password = newPassword;
  await user.save();

  user.password = undefined;

  sendTokenResponse(res, user, 200);
});

//Restrict To
exports.restrictTo = (...permittedRoles) => (req, res, next) => {
  const userRole = req.user.role;

  if (permittedRoles.includes(userRole)) {
    // If the user's role is included in the permitted roles, grant access.
    next();
  } else {
    // If the user's role is not included in the permitted roles, deny access.
    const errorMessage = `You don't have permission to perform this action.`;
    return res.status(403).json({ status: 'fail', message: errorMessage });
  }
};