# UziMail Node API - Beta 1.0

Uzimail is an emailing service built off of the Sendgrid and SparkPost API. It
sends emails via SparkPost, and defaults to the SendGrid email provider. In the
case of SparkPost errors, and abstracts the complications away from clients.

## Prerequisites

Before using this API, you must have:

* Node.js version 6, 7 or 8
* A SparkPost Account, [sign up for a new account][sparkpost sign up] or
  [login to SparkPost](https://app.sparkpost.com/)
* A valid SparkPost API Key. Check out SparkPost's
  [Support Center](https://support.sparkpost.com/) for information on how to
  [create API keys](https://support.sparkpost.com/customer/portal/articles/1933377-create-api-keys)
* A SendGrid account,
  [sign up for free](https://sendgrid.com/free?source=sendgrid-nodejs) to send
  up to 40,000 emails for the first 30 days or check out
  [our pricing](https://sendgrid.com/pricing?source=sendgrid-nodejs).
* A remote Postgres Database as a Service provider. I used elephantSQL.
  [signup for an account](https://customer.elephantsql.com/login), and be sure
  to store your database URL in a .env file

# TODOs

* develop authentication to confirm users and seemlessly provide api with user
  information -
* develop a client UI - A nice to have

# Retrospective
