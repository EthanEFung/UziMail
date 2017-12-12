To do this using postman, specify a POST request to `localhost:3000/user/create`
![postman user creation 1](/assets/postman_user_creation_1.png)

No authorization is needed, however be sure to specify a content type of
`application/json` in the Headers
![postman user creation 2](/assets/postman_user_creation_2.png)

Once the content type is specified select the `Body` Tab, select `raw`, and
change dropdown that says `Text` to be `JSON(application/json)`

![postman user creation 3](/assets/postman_user_creation_3.png)

Finally specify a JSON object with the required attributes `username` and
`email`

![postman user creation 4](/assets/postman_user_creation_4.png)

Perfect! Now all that needs to be done is to click the blue `Send` button, and
beneath you'll find response object with the following data.

![postman user creation 5](/assets/postman_user_creation_5.png)

If the user with the same username and email is specified in the request's body,
the user is found, and not created.

What you will notice is that the response object specifies an Id. This is your
userId. Remember this number as it is vital for all other services provided.
