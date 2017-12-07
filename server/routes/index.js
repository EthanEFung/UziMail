const router = require("express").Router();
const statusOK = require("../../lib/statusOK");

//promise based user controllers
const {
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

//promise based contact controllers
const {
  getContacts,
  createContacts,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

router.get("/", statusOK);

//operations for users
router
  .route("/users/:user-id")
  .post(createUser)
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

//operations for contacts
router
  .route("/contacts/:user-id")
  .post(createContacts)
  .get(getContacts)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
