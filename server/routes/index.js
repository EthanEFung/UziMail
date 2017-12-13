const router = require("express").Router();
const { Contact, User } = require("../../db/models"); //injecting dependencies for unit tests
//promise based user controller
const {
  createUser,
  fetchUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

//promise based contact controller
const {
  createContacts,
  fetchContacts,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

//promise base email controller
const {
  createEmail
} = require("../controllers/emailController/emailController");

router.get("/", (req, res) => res.sendStatus(200));

//operations for users
router
  .post("/user/create", createUser)
  .get("/user/:userId/fetch", fetchUser)
  .put("/user/:userId/update", updateUser)
  .delete("/user/:userId/delete", deleteUser);

//operations for contacts
router
  .post("/user/:userId/createContacts", (req, res) =>
    createContacts(req, res, Contact)
  )
  .get("/user/:userId/fetchContacts", (req, res) => {
    fetchContacts(req, res, Contact);
  })
  .put("/user/:userId/updateContact", (req, res) => {
    updateContact(req, res, Contact);
  })
  .delete("/user/:userId/deleteContact", (req, res) => {
    deleteContact(req, res, Contact);
  });

//operations for emailing
router.post("/user/:userId/createEmail", createEmail);

module.exports = router;
