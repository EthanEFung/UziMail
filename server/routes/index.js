const router = require("express").Router();
const statusOK = require("../../lib/statusOK");

//promise based user controllers
const {
  createUser,
  fetchUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

//promise based contact controllers
const {
  fetchContacts,
  createContacts,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

const { sendEmail } = require("../controllers/emailController");

router.get("/", statusOK);

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
router.post("/user/:userId/sendEmail", sendEmail);

module.exports = router;
