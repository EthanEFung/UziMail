const router = require("express").Router();

//promise based user controllers
const {
  createUser,
  fetchUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

//promise based contact controllers
const {
  createContacts,
  fetchContacts,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

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
  .post("/user/:userId/createContacts", createContacts)
  .get("/user/:userId/fetchContacts", fetchContacts)
  .put("/user/:userId/updateContact", updateContact)
  .delete("/user/:userId/deleteContacts", deleteContact);

//operations for emailing
router.post("/user/:userId/createEmail", createEmail);

module.exports = router;
