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
 */
const sendEmail = (req, res) => {
  //journal process
  const journal = new Journal("send email");
  let defaultFails = false;
  let getContacts;

  //parse to either send to a group or all contacts
  if (req.body.group === "all" || !req.body.group) {
    journal.entry("sending email to all contacts");
    getContacts = sendAllEmail;
  } else {
    journal.entry("sending group email");
    getContacts = sendGroupEmail;
  }

  //send via master provider
  getContacts(req, res)
    .then(contacts => {
      journal.entry("sending via sparkpost");
      journal.attach(contacts);
      return sendViaSparkPost(req.params.userId, contacts);
    })
    .then(data => {
      journal.entry("received data", data);
      res.send(journal);
    })
    //catch errors to master provider and send via slave
    .catch(err => {
      journal.entry(
        "failed to send via sparkpost",
        err,
        "sending via sendgrid"
      );
      sendViaSendGrid(req.params.userId, journal.body)
        .then(data => {
          journal.entry("received data", data);
          journal.attach(data);
          res.send(journal);
        })
        .catch(err => {
          journal.entry("error sending via providers", err);
          res.send(journal);
        });
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

function sendViaSparkPost(userId, contacts) {
  const SparkPost = require("sparkpost");
  const client = new SparkPost();

  return new Promise((resolve, reject) => {
    client.transmissions
      .send({
        content: {
          from: "testingSparkPost@test.com",
          subject: "hello, world!",
          html: "<html><body><p>test</p></body></html>"
          //add html attribute if fails
        },
        recipients: [{ address: "ethanefung@gmail.com" }]
      })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

function sendViaSendGrid(userId, contacts) {
  return new Promise(resolve => resolve("hi"));
}
module.exports = { sendEmail };
