# Product Management App

## Overview

This is a full-stack Product Management application built with Node.js/Express (backend) and React.js (frontend) using MongoDB as the database. The frontend is styled with Tailwind CSS, and JWT authentication secures the API endpoints. It includes signup and login functionality.

## Backend Setup

1. Navigate to `server/` directory
2. Install dependencies: `npm install`
3. Create `.env` file with:
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
4. Run the server: `npm start` or `npm run dev`

## Frontend Setup

1. Navigate to `client/` directory
2. Install dependencies: `npm install`
3. Run the app: `npm start`

## API Endpoints

- POST `/auth/register` - Register a new user
  - Request: `{ "email": "string", "password": "string", "name": "string" }`
  - Response: `{ "token": "jwt", "user": { "id": "string", "email": "string", "name": "string" } }`
- POST `/auth/login` - Login a user
  - Request: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "jwt", "user": { "id": "string", "email": "string", "name": "string" } }`
- POST `/products` - Create a new product (Protected)
- GET `/products` - Fetch all products (Protected)
- GET `/products/:id` - Fetch a specific product (Protected)
- PUT `/products/:id` - Update a product (Protected)
- DELETE `/products/:id` - Delete a product (Protected)

## Features

- User authentication with JWT (signup and login)
- Protected product management routes
- Responsive UI with Tailwind CSS
- Login/Logout functionality
- Signup page for new users
- CRUD operations for products
