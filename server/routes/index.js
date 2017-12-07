const router = require("express").Router();
const statusOK = require("../controllers/statusOK");

const {
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const {
  getContacts,
  createContacts,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

router.get("/", statusOK);

//operations for users
router
  .route("/users/:id")
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

//operations for contacts
router
  .route("/contacts/:user-id/:contacts")
  .get(getContacts)
  .post(createContacts)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
