const Sequelize = require("sequelize");
const configureEnv = require("../lib/configureEnv");
configureEnv("../");

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  pool: { max: 5, min: 0, idle: 20000, aqquire: 20000, evict: 20000 },
  logging: false
});

db
  .authenticate()
  .then(() => console.log("connected to db"))
  .catch(err => console.log("could not connect to db: ", err));

module.exports = db;
