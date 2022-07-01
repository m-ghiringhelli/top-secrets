# PLAN

I POST route for create user to '/api/v1/users/sessions'
  - create user table
  - create dummy user for testing
  - test for creating user in table
  - create model for user
  - insert method on user model
  - password hash for user password
  - create user on userservice class
  - create controller for route
II DELETE for same path
- test for deleting user from table`
- controller for route
III POST route for login user
- test for logging in
- controller for route
- store user info in cookie on sign in
- sign in user method on userservice class
IV GET route for '/api/v1/secrets' ([ {title, description, createdAt }])
- create table for secrets
- get all secrets test
- secrets model
- get all method
- authenticate middle ware to restrict access to users
- controller for route
V POST route for secrets
- test for secrets posting
- insert method on secrets model
- controller for post route
- celebrate!
