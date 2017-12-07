const { User } = require("../../db/models");

/**
 *
 * @param {Stream} req
 * @param {Stream} res
 *
 * skeleton:
 * create a sparkpost api key
 * create a sendgrid api key
 * create user in the database
 */
const createUser = (req, res) => {
  User.findOrCreate({
    where: {
      email: req.body.email
    }
  });
};
const getUser = (req, res) => {};
const updateUser = (req, res) => {};
const deleteUser = (req, res) => {};
module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser
};
