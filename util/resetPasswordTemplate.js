exports.resetHtmlTemplate = (protocol, host, forgotPasswordToken) => `<!doctype html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </head>
  <style type="text/css">
    body {
      background-color: #88bdbf;
      margin: 0px;
    }
  </style>
  <body style="margin: 0px">
    <table
      border="0"
      width="50%"
      style="
        margin: auto;
        padding: 30px;
        background-color: #f3f3f3;
        border: 1px solid #630e2b;
      "
    >
      <tr>
        <td>
          <table border="0" width="100%">
            <tr>
              <td>
                <h1>
                  <img
                    width="100px"
                    src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"
                  />
                </h1>
              </td>
              <td>
                <p style="text-align: right">
                  <a
                    href="http://localhost:4200/#/"
                    target="_blank"
                    style="text-decoration: none"
                    >View In Website</a
                  >
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="text-align: center; width: 100%; background-color: #fff"
          >
            <tr>
              <td
                style="
                  background-color: #630e2b;
                  height: 100px;
                  font-size: 50px;
                  color: #fff;
                "
              >
              <tr>
              <td>
                <p style="padding: 0px 100px">
                Hello,

                Did you forget your password for CafeManagement? No worries—we're here to help! Click the link below to reset your password and regain access to your account.
                
                [Reset Password Link]
                
                If you didn't request a password reset, please ignore this email. Ensuring the security of your CafeManagement account is our top priority.
                
                Best regards,
                The CafeManagement Team ☕️
                </p>
              </td>
            </tr>
                <img
                  width="50px"
                  height="50px"
                  src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png"
                />
              </td>
            </tr>
            <tr>
              <td>
                <h1 style="padding-top: 25px; color: #630e2b">
                  Email Confirmation
                </h1>
              </td>
            </tr>
            <tr>
              <td>
                <p style="padding: 0px 100px"></p>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  href="http://localhost:8000/api/v1/users/resetPassword/${forgotPasswordToken}"
                  style="
                    margin: 20px 0px 30px 0px;
                    border-radius: 4px;
                    padding: 10px 20px;
                    border: 0;
                    color: #fff;
                    background-color: #630e2b;
                  "
                  >Reset Password</a
                >
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table
            border="0"
            width="100%"
            style="border-radius: 5px; text-align: center"
          >
            <tr>
              <td>
                <h3 style="margin-top: 10px; color: #000">Stay in touch</h3>
              </td>
            </tr>
            <tr>
              <td>
                <div style="margin-top: 20px">
                  <a href="" style="text-decoration: none"
                    ><span
                      class="twit"
                      style="padding: 10px 9px; color: #fff; border-radius: 50%"
                    >
                      <img
                        src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png"
                        width="50px"
                        hight="50px" /></span
                  ></a>

                  <a href="" style="text-decoration: none"
                    ><span
                      class="twit"
                      style="padding: 10px 9px; color: #fff; border-radius: 50%"
                    >
                      <img
                        src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png"
                        width="50px"
                        hight="50px"
                    /></span>
                  </a>

                  <a href="" style="text-decoration: none"
                    ><span
                      class="twit"
                      style="padding: 10px 9px; color: #fff; border-radius: 50%"
                    >
                      <img
                        src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png"
                        width="50px"
                        hight="50px"
                    /></span>
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
