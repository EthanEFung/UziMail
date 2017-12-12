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
  specifying both username and email in the body of the request and specifying
  your own userId at `localhost:3000/user/:userId/update`
* Delete User: send a delete request and specify your own userId at
  `localhost:3000/user/:userId/delete`
