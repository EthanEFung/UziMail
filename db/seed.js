const Sequelize = require("sequelize");
const path = require("path");
const db = require("./config");
const { User, Contact } = require("./models");

console.log("seed initiated, authenticating");
db
  .authenticate()
  .then(console.log("authenticated, syncing user models"))
  .then(() => User.sync({ force: true }))
  .then(() =>
    User.bulkCreate([
      {
        email: "test_1_email",
        username: "test_1_username"
      },
      {
        email: "test_2_email",
        username: "test_2_username"
      },
      {
        email: "test_3_email",
        username: "test_3_username"
      },
      {
        email: "test_4_email",
        username: "test_4_username"
      },
      {
        email: "test_5_email",
        username: "test_5_username"
      }
    ])
  )
  .then(() => console.log("created users, syncing contact models"))
  .then(() => Contact.sync({ force: true }))
  .then(() =>
    Contact.bulkCreate([
      {
        email: "test_1_contact_email",
        userId: 1
      },
      {
        email: "test_2_contact_email",
        userId: 1
      },
      {
        email: "test_3_contact_email",
        userId: 1
      },
      {
        email: "test_4_contact_email",
        userId: 2
      },
      {
        email: "test_5_contact_email",
        userId: 3
      },
      {
        email: "test_6_contact_email",
        userId: 4
      }
    ])
  )
  .then(() => {
    console.log("created contacts \ndatabase seeded!");
    process.exit();
  })
  .catch(err => {
    throw err;
  });
