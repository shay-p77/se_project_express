# WTWR (What to Wear?): Back End

This is the backend server for the WTWR (What to Wear) application, a weather-based clothing recommendation app. The server provides a RESTful API for managing users and clothing items, including support for user registration, authentication, and item interactions like adding, deleting, and liking clothing items.

Technologies
Node.js and Express.js — for building the REST API

MongoDB and Mongoose — for database modeling and queries

ESLint — for code linting and style enforcement

Custom error handling middleware — to manage API errors

RESTful routing — structured and modular route handling

Postman — for testing API endpoints during development

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

## Deployment

The backend API is accessible at: https://api.wtwr.com.jumpingcrab.com  
The frontend is served at: https://wtwr.com.jumpingcrab.com

Make sure you have the server running with PM2:

```bash
pm2 start app.js --name wtwr-backend
```
