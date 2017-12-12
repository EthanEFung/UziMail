# Service Endpoints

Using Postman, send CRUD operations to the following endpoints with this API, be
sure to [create a user](/server/user_creation.md) prior to using the service. In
the user_creation.md specifies all the requirements needed to properly send data
to the rest server.

## User Endpoints

* Create a user: send a post request to `localhost:3000/user/create`
* Fetch user: send a get request and specify your own userId at
  `localhost:3000/user/:userId/fetch`
* Update User: update a users email or username by making a put request
  specifying both `username` and `email` in the body of the request and
  specifying your own userId at `localhost:3000/user/:userId/update`
* Delete User: send a delete request and specify your own userId at
  `localhost:3000/user/:userId/delete`

```js
//operations for users
router
  .post("/user/create", createUser)
  .get("/user/:userId/fetch", fetchUser)
  .put("/user/:userId/update", updateUser)
  .delete("/user/:userId/delete", deleteUser);
```

## Contact Endpoints

Contacts and contact groups can be stored in our database. This way emails can
be sent to multiple parties without having to specify time and time again which
people receive the emails.

* Create contacts: send a post request to
  `localhost:3000/user/:userId/createContacts` with body with a `contacts`
  attribute. `contacts` must be an array. Here is an example of a valid request
  body: ![create contacts](/assets/create_contacts_1.png)

* Fetch contacts: send a get request and specify your own `userId` at
  `localhost:3000/user/:userId/fetchContacts`

* Update contact: update a contact by making a put request specifying your own
  `userId` in the parameters, the `contactId`, `email` and `group` in the body
  of the request at `localhost:3000/user/:userId/updateContact`

* Delete contact: send a delete request and specify your own `userId` in the
  parameters and `contactId` in the request body.
  `localhost:3000/user/:userId/deleteContacts`

```js
//operations for contacts
router
  .post("/user/:userId/createContacts", createContacts)
  .get("/user/:userId/fetchContacts", fetchContacts)
  .put("/user/:userId/updateContact", updateContact)
  .delete("/user/:userId/deleteContacts", deleteContact);
```

## Send Email Endpoint

Once a user and a number of contacts are established, the emailing service can
be rendered. Specify a `userId` in the parameters, and send the following JSON
object at `localhost:3000/user/:userId/createEmail`

![send email](/assets/create_email_example.png)

```js
//operations for emailing
router.post("/user/:userId/createEmail", createEmail);
```

Once the post request is made, the service will send an email to the specified
group. If no group is specified, the service emails all contacts of the user.

[Click Here](/create_email_request.md) To see the system design for the email
service
