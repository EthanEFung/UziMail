const db = require("./config");
const Sequelize = require("sequelize");

const User = db.define("user", {
  username: { type: Sequelize.TEXT, allowNull: false },
  email: { type: Sequelize.TEXT, allowNull: false }
});

const Contact = db.define("contact", {
  email: { type: Sequelize.TEXT, allowNull: false },
  group: { type: Sequelize.TEXT, allowNull: true }
});

User.hasMany(Contact);
Contact.belongsTo(User);

module.exports = { User, Contact };
