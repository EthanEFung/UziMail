# UziMail Node API - Beta 1.0

Uzimail is an emailing service built off of the Sendgrid and SparkPost API. It
sends emails via SparkPost, and defaults to the SendGrid email provider.
SparkPost errors are abstracted away from clients, and emailing service is still
provided.

## Prompt

"What I can say is that the project requires very little if any client-side
code. It is much more about functionality and ensuring that no errors pop up
when switching between providers."

Email Service: Create a service that accepts the necessary information and sends
emails. It should provide an abstraction between two different email service
providers. If one of the services goes down, your service can quickly failover
to a different provider without affecting your customers.

## Prerequisites

This product for the time being needs to be run locally. Before using this API,
you must have:

* Node.js version 6, 7 or 8
* A SparkPost Account,
  [sign up for a new account or login to SparkPost](https://app.sparkpost.com/)
* A valid SparkPost API Key. Check out SparkPost's
  [Support Center](https://support.sparkpost.com/) for information on how to
  [create API keys](https://support.sparkpost.com/customer/portal/articles/1933377-create-api-keys)
* A SendGrid account,
  [sign up for free](https://sendgrid.com/free?source=sendgrid-nodejs) to send
  up to 40,000 emails for the first 30 days or check out
  [SendGrid's pricing](https://sendgrid.com/pricing?source=sendgrid-nodejs).
* A remote Postgres Database as a Service provider. I used elephantSQL.
  [signup for an account](https://customer.elephantsql.com/login)
* TEMPORARY DEPENDENCY - Postman Native Application.
  [get postman](https://www.getpostman.com/). As a beta, this dependency is
  required in order to send CRUD operations with json payloads. Once an UI, and
  or extended API is built, this will no longer be needed.

Be sure to create a .env file to store all your api keys.
[Sample Env](.env_sample)

## How to run this service

From the command line

```cli
//install dependencies
npm install

//seed the remote database with dummy data
npm run seed

//start REST server
npm start
```

Now, the service runs on your local machine. After running the rest server, the
command line will notify on which port the service is running on. Service
defaults localhost:3000/

## Service endpoints

[Read this](/server/SERVICE_ENDPOINTS.md) to learn the functionality of this
service

## Retrospective

This repository was created in response to a coding challenge.
[Read this](RETROSPECTIVE.md) to read about future implementations, and
challenges faced.
