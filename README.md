Event Mangement API

A Node.js + Express + Sequelize + PostgreSQL backend server to manage user registrations and event organization efficiently.

Features
->User registration and login with JWT(Json Web token) authentication.
->Event Creation, Registration,Cancellation and retrieval.
->Track or get registered users for each event.
->Fetch Upcoming events with custom sorting.
->Get event capacity usage statistics (in percentage).
->Meaningful error messages and proper HTTP status codes.

Technologies Used
--Node.js + Express.
--Sequelize:ORM for PostgreSQL.
--PostgreSQL: As Database.
--Jsonwebtoken: For Authentication.
--bcryptjs:Password security.
--Postman:Api Testing.

Set Up Instructions

1.Clone the repository in local folder by commands like
--git clone<repository-url> //paste here this repository url
--or You can also download zip file and extract the file and open in vscode or in any IDE.

then run command in terminal
--cd event-management-api #for changing directory event-management-api.

2.npm install then enter.

3.Create a .env file.

-APP_PORT=Ur_port
-APP_ENV=develepment||test||production.

- -DB_HOST="Database-host-name"
  -DB_PORT=Database_port
  -DB_USERNAME="ur Db name"
  -DB_PASSWORD="password"
  -DB_NAME="Name of database u want to create or use"
  -JWT_SECRET = "SecretKey"

4.Configure your config/config.js with your PostgreSQL credentials.

5.Run migrations:

----npx sequelize-cli db:migrate

6.Start the server
----npm run dev

Server will run on-->http://localhost:3000-->baseurl

## API Routes

# User Authentication

methodtype =POST "baseurl"/api/users/register ➔ Register a user.

methodtype = POST "baseurl"/api/users/login ➔ Login and receive JWT token.

# Event Management

method=POST baseurl/api/events/create ➔ Create a new event.

method=GET "baseurl"/api/events/:id ➔ Get event details with registered users.

method =POST "baseurl"/api/events/register ➔ Register a user for an event (JWT protected).

mehtod=POST "baseurl"/api/events/cancel ➔ Cancel a user's registration (JWT protected).

mehtod=GET "baseurl"/api/events/:id/stats ➔ Get statistics for an event.

method GET "baseurl"/api/events/all-with-registrations ➔ List all events with registered users.

method = GET "baseurl"/api/events/upcoming/list ➔ List upcoming events, sorted by dateTime and location.

## Postman Testing

1.Download and import the Postman collection for systematic testing:

[📥 Download Postman Collection](postman/Event-Management-API.postman_collection.json)

# Testing Workflow:

- Register User
- Login to receive JWT
- Create Event
- Register for Event (using JWT in header)
- Cancel Registration
- Fetch Event Details
- Fetch Event Stats
- List All Events with Registered Users
- List Upcoming Events
