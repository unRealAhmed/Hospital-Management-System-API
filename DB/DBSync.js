/* eslint-disable no-unused-vars */
const sequelize = require('./DBConnection')


sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
}).catch((err) => {
  console.error('Error synchronizing database:', err);
});