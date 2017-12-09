const { User } = require("../../db/models");
const validateInput = require("../../lib/validateInput");
const createAccount = require("../../lib/createAccount");
const Journal = require("../../lib/Journal");

/**
 * @param {readable-stream} req must contain body with email, and username attributes
 * @param {writable-stream} res stream to send back to the client
 */
const createUser = (req, res) => {
  //journal process
  const journal = new Journal("createUser process");
  journal.entry(`storing user for ${req.body.username}`);

  User.findOrCreate({
    where: { username: req.body.username, email: req.body.email }
  })
    .spread((user, created) => {
      journal.attach(user);
      journal.entry(`user was created? ${created}`);
      res.send(journal);
    })
    .catch(err => {
      journal.entry(`could not create user: ${err}`);
      res.send(journal);
    });
};

/**
 *
 * @param {readable-stream} req must contain parameters with userId
 * @param {writable-stream} res stream to send to client
 */
const fetchUser = (req, res) => {
  //journal process
  const journal = new Journal("fetching user");
  journal.entry("finding user in db");

  User.findOne({
    where: { id: req.params.userId }
  })
    .then(data => {
      journal.entry("received response from db");
      journal.attach(data);
      res.send(journal);
    })
    .catch(err => {
      journal.entry(`error finding user ${err}`);
      res.send(journal);
    });
};

/**
 * @param {readable-stream} req must contain userId parameter and body with:
 *    email AND username
 * @param {writable-stream} res stream to send back to the client
 */
const updateUser = (req, res) => {
  //journal process
  const journal = new Journal("Update User");
  journal.entry("searching for user in db");

  User.update(
    { email: req.body.email, username: req.body.username },
    { where: { id: req.params.userId } }
  )
    .spread((rows, data) => {
      if (rows === 0) throw Error("did not affect any rows in db");
      journal.entry("received response from db");
      journal.entry(`rows affected ${rows}`);
      journal.attach(data);
      res.send(journal);
    })
    .catch(err => {
      journal.entry(`could not update user ${err}`);
      res.send(journal);
    });
};

/**
 * @param {readable-stream} req must contain id in params of selected user
 * @param {writable-stream} res stream to send back to the client
 */
const deleteUser = (req, res) => {
  //journal process
  const journal = new Journal("delete user");
  journal.entry("deleting user");

  User.destroy({ where: { id: req.params.userId } })
    .then(data => {
      journal.entry(`destroyed ${data} rows in user database`);
      journal.entry(`userId ${req.params.userId} destroyed`);
      res.send(journal);
    })
    .catch(err => {
      journal.entry(`could not destroy user in database ${err}`);
      res.send(journal);
    });
};

module.exports = {
  createUser,
  fetchUser,
  updateUser,
  deleteUser
};
