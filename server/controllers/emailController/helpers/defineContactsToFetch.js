const { Contact } = require("../../../../db/models");

function defineContactsToFetch(req, journal) {
  if (req.body.group === "all" || !req.body.group) {
    journal.entry("sending email to all contacts");
    return sendAllEmail;
  } else {
    journal.entry("sending group email");
    return sendGroupEmail;
  }
}

function sendAllEmail(req) {
  return new Promise((resolve, reject) => {
    return Contact.findAll({ where: { userId: req.params.userId } })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function sendGroupEmail(req) {
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
}

module.exports = defineContactsToFetch;
