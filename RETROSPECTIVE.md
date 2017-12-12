# TODOs

* fully developed REST API - right now, the only data that can be received is
  json. I plan on creating a service that can receive curl commands.
* develop testing - In the process of learning asynchronous unit testing using
  jest. Could not complete in given deadline December 11, 2017.
* develop authentication to confirm users and seemlessly provide api with user
  information - MUST HAVE, without authentication, the use of this service does
  not have viability as an actual service.
* develop a client UI - A nice to have, however given the scope of the project,
  I much rather have a service that could be easily integrated

# Retrospective

In my mind there is much more work that must be done. My main blockers revolved
around troubles in jest unit testing. I had implemented several test suites, but
ran into configuration issues. I ended up nuking the tests in the suites,so that
I could limit memory leaks, and fully develop an MVP given the time alloted.

The second blocker I experienced early in development was making a system design
decision to house client's user information in a database as opposed to using
the extensive use of sendgrid and sparkposts services. I had hoped the
application would sign up each client as sparkpost and sendgrid subusers so
that, we wouldn't need to handle user contact data. However, given the time
spent trying to solve jest configuration issues, I thought it best to focus my
time on rendering the service.
