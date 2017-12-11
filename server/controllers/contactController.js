const Journal = require("../../lib/Journal");
const { Contact } = require("../../db/models");

/**
 * @param {readable-stream} req must contain the following:
 *   @param {[]} req.body.contacts collection of objects with the following
 *     @param {string} req.body.contacts[i].email
 *     @param {number} req.body.contacts[i].userId
 *     @param {string} req.body.contacts[i].group
 * @param {writeable-stream} res stream to attach journal to
 */
const createContacts = (req, res) => {
  //journal process
  const journal = new Journal("Create Contacts");
  journal.entry("creating entry in the db");

  Contact.bulkCreate(req.body.contacts)
    .then(data => {
      journal.entry("received response from db");
      journal.attach(data);
      res.send(journal);
    })
    .catch(err => {
      journal.entry("could not create contact");
      journal.entry(err);
      res.send(journal);
    });
};

/**
 * @param {readable-stream} req must contain the following:
 *   @param req.params.userId {number}
 * @param {writeable-stream} res stream to attach journal to
 */
const fetchContacts = (req, res) => {
  //journal process
  const journal = new Journal("fetch contacts");
  journal.entry("fetching contacts");

  Contact.findAll({ where: { userId: req.params.userId } })
    .then(data => {
      journal.entry("received data");
      journal.attach(data);
      res.send(journal);
    })
    .catch(err => {
      journal.entry(`could not fetch contacts for user ${req.params.userId}`);
      journal.entry(err);
      res.send(journal);
    });
};

/**
 * @param {readable-stream} req must contain the following:
 *   @param {number} req.body.contactId
 *   @param {string} req.body.email
 *   @param {string} req.body.group optional
 * @param {writeable-stream} res stream to attach journal to
 */
const updateContact = (req, res) => {
  //journal process
  const journal = new Journal("update contacts");
  journal.entry(`updating contact ${req.body.contactId}`);

  let updateEmail = false;
  let updateGroup = false;

  Contact.update(
    { email: req.body.email, group: req.body.group },
    { where: { id: req.body.contactId } }
  )
    .then(rows => {
      if (rows === 0) throw Error("no rows in the contacts were updated");
      journal.entry(`${rows} were affected`);
      res.send(journal);
    })
    .catch(err => {
      journal.entry(`could not update contact`);
      journal.entry(err);
      res.send(journal);
    });
};

/**
 * @param {readable-stream} req must contain the following:
 *   @param {number} req.body.contactId
 * @param {writeable-stream} res stream to attach journal to
 */
const deleteContact = (req, res) => {
  //journal process
  const journal = new Journal("delete contacts");
  journal.entry("deleting contact");

  Contact.destroy({ where: { id: req.body.contactId } })
    .then(data => {
      journal.entry(`destroyed contact ${req.body.contactId}`);
      journal.attach(data);
      res.send(journal);
    })
    .catch(err => {
      journal.entry(`could not destroy contact ${req.body.contactId}`);
      journal.entry(err);
      res.send(journal);
    });
};

module.exports = {
  createContacts,
  fetchContacts,
  updateContact,
  deleteContact
};
