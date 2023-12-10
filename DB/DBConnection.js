require('dotenv').config({ path: '../config.env' })
const { Sequelize } = require('sequelize')
// const mysql = require('mysql2')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
)

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(`Database Connected Successfully..👍`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectDB()

module.exports = sequelize