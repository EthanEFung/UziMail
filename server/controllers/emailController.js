const Journal = require("../../lib/Journal");
const { Contact } = require("../../db/models");
const findOrDefaultNull = require("../../lib/findOrDefaultNull");
/**
 *
 * @param {readable-stream} req must contain userId in parameters,
 *   grouping required** specify "all" in group if necessary
 *   text to send to recipients
 * @param {*} res
 *
 * skeleton:
 * parse if sending to a group or all contacts
 *
 */
const sendEmail = (req, res) => {
  //journal process
  const journal = new Journal("send email");
  let getContacts;

  if (req.body.group === "all" || !req.body.group) {
    journal.entry("sending email to all contacts");
    getContacts = sendAllEmail;
  } else {
    journal.entry("sending group email");
    getContacts = sendGroupEmail;
  }

  getContacts(req, res)
    .then(contacts => {
      try {
        journal.entry("received contacts", contacts, "sending to sparkpost");
        return sendViaSparkPost(req.params.userId, contacts);
      } catch (e) {
        journal.entry("failed to send via sparkpost, sending via sendgrid");
        return sendViaSendGrid(req.params.userId, contacts);
      }
    })
    .then(data => {
      journal.entry("received data", data);
      res.send(journal);
    })
    .catch(err => {
      journal.entry("error sending via providers", err);
      res.send(journal);
    });
};

const sendAllEmail = (req, res) => {
  return new Promise((resolve, reject) => {
    Contact.findAll({ where: { userId: req.params.userId } })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const sendGroupEmail = (req, res) => {
  return new Promise((resolve, reject) => {
    Contact.findAll({
      where: { userId: req.params.userId, group: req.body.group }
    })
      .then(contacts => {
        resolve(contacts);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const sendViaSparkPost = (userId, contacts) => {
  return new Promise((resolve, reject) => resolve("hello, world"));
};

const sendViaSendGrid = (userId, contacts) => {
  return new Promise((resolve, reject) => resolve("hi"));
};
module.exports = { sendEmail };
