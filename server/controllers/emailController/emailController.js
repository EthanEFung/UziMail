const Journal = require("../../../lib/Journal");
const { Contact, User } = require("../../../db/models");
const defineContactsToFetch = require("./helpers/defineContactsToFetch");
const fetchUserInfo = require("./helpers/fetchUserInfo");
const sendViaSparkPost = require("./helpers/sendViaSparkPost");
const sendViaSendGrid = require("./helpers/sendViaSendGrid");

/**
 * @param {userId, group, payload} req must contain userId in parameters,
 *   @param {number} userId the user who is requesting to send an email
 *   @param {string} group grouping required** specify "all" in group if necessary
 *   @param {{}} payload payload to send to recipients
 * @param {*} res
 */
const createEmail = (req, res) => {
  //journal process
  const journal = new Journal("send email");
  const fetchContacts = defineContactsToFetch(req, journal);
  const userInfo = journal.body;

  fetchUserInfo(req)
    .then(data => {
      journal.entry("recevied userInfo from db");
      journal.attach(data);
      return fetchContacts(req);
    })
    .then(contacts => {
      journal.entry("sending via master provider");
      journal.body.contacts = contacts;
      return sendViaSparkPost(journal.body, req.body.payload);
    })
    .then(data => {
      journal.entry("received data", data);
      res.send(journal);
    })
    //catch errors master provider throws, and default to slave provider
    .catch(err => {
      journal.entry(
        "failed to send via master provider",
        err,
        "sending via slave provider #1"
      );
      sendViaSendGrid(journal.body, req.body.payload)
        .then(([response, body]) => {
          journal.entry(`status code: ${response.statusCode}`);
          journal.attach(response.statusCode);
          res.send(journal);
        })
        .catch(err => {
          //if slave provider also fails, ideally, set up another provider to handle
          //for now send error to client
          journal.entry("error sending via providers", err);
          res.send(journal);
        });
    });
};

module.exports = { createEmail };
