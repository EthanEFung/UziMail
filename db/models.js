const db = require("./config");
const Sequelize = require("sequelize");

const User = db.define("user", {
  email: { type: Sequelize.TEXT, allowNull: false },
  master_provider_API: { type: Sequelize.TEXT, allowNull: false },
  slave_provider_API: { type: Sequelize.TEXT, allowNull: false }
});

const Contact = db.define("contact", {
  email: { type: Sequelize.TEXT, allowNull: false }
});

User.hasMany(Contact);
Contact.belongsTo(User);

module.exports = { User, Contact };
