// promise helper
const Journal = require("../../../lib/Journal");

// email controller helper functions
const defineContactsToFetch = require("./helpers/defineContactsToFetch");
const fetchUserInfo = require("./helpers/fetchUserInfo");
const sendViaSparkPost = require("./helpers/sendViaSparkPost");
const sendViaSendGrid = require("./helpers/sendViaSendGrid");

/**
 * Provide the following in the form of json
 * @param {readable-stream} req must contain the following attributes
 *   @param {number} req.params.userId the user who is requesting to send an email
 *   @param {string} req.body.group grouping required** specify "all" in group if necessary
 *   @param {{}} req.body.payload payload to send to recipients
 * @param {writable-stream} res stream to send data back to the client
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
      //Add the contacts to the body
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
          journal.body.statusCode = response.statusCode;
          res.send(journal);
        })
        .catch(err => {
          //if slave provider also fails, ideally, set up another provider
          //to handle 2nd error. For now send error to client
          journal.entry("error sending via providers", err);
          res.send(journal);
        });
    });
};

module.exports = { createEmail };
