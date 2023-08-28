# User Registration and Email Confirmation

This Node.js REST API provides endpoints to simulate user registration and email confirmation processes.

## Features

- **User Registration:** Register users by sending their details via the request body.

- **Email Confirmation:** After registration, the API sends a confirmation email containing a URL to verify the user's registration.

- **Validation Service:** Validate user registration by using a time-limited token that expires in 24 hours.

## Installation

To get started with the API, follow these steps:

1. Navigate to the project directory: `cd your-api`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Start the server: `npm start`

## Configuration

Before running the API, make sure to set up your environment variables. Rename the `env.example` file to `.env` and provide appropriate values for the following variables:

- `JWT_SECRET`: Secret key used for JWT token generation and validation.
- `DATABASE_URL`: URL for your database connection.
- `EMAIL_HOST`: Hostname of the email server for sending verification emails.
- `EMAIL_PORT`: Port number for the email server.
- `EMAIL_USER`: Username for the email server authentication.
- `EMAIL_PASS`: Password for the email server authentication.

## Endpoints

### 1. `/signup`

This endpoint allows users to register by providing the following parameters in the request body:

- `email`: User's email address.
- `password`: User's password.
- `username`: User's username.

Upon successful registration, a verification email containing a token will be sent to the provided email address.

Example request:

```http
POST /signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secretpassword",
  "username": "myusername"
}
```

### 2. `/login`

Users can log in using this endpoint by providing their email and password. The server will respond with an authentication token.

Example request:

```http
POST /login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secretpassword"
}
```

### 3. `/confirm-email/:token`

This endpoint is used to confirm a user's email address using the verification token received in the verification email.

Example request:

```http
GET /confirm-email/token
```

### 4. `/protected`

Once a user is authenticated, they can access this protected endpoint by including the authentication token in the `Authorization` header with the `Bearer` scheme.

Example request:

```http
GET /protected
Authorization: Bearer your-auth-token
```

## Error Codes

- `400`: Bad request.
- `401`: Unauthorized.
- `404`: Not found.
- `500`: Internal server error.

## Dependencies

This project relies on the following libraries and packages:

- **@prisma/client** (`^5.2.0`): Prisma client for database interaction.
- **@types/crypto-js** (`^4.1.1`): Type definitions for CryptoJS.
- **@types/express** (`^4.17.17`): Type definitions for Express.js.
- **@types/jsonwebtoken** (`^9.0.2`): Type definitions for JSON Web Token.
- **@types/mjml** (`^4.7.1`): Type definitions for MJML (Mailjet Markup Language).
- **@types/nodemailer** (`^6.4.9`): Type definitions for Nodemailer.
- **crypto-js** (`^4.1.1`): Library for cryptographic functions.
- **dotenv** (`^16.3.1`): Loads environment variables from a `.env` file.
- **express** (`^4.18.2`): Web application framework for Node.js.
- **jsonwebtoken** (`^9.0.1`): Library for JSON Web Token generation and verification.
- **mjml** (`^4.14.1`): Framework for responsive email templates.
- **nodemailer** (`^6.9.4`): Library for sending emails from Node.js.
- **nodemon** (`^3.0.1`): Utility that restarts the server when changes are detected during development.
- **express-validator** (`^7.0.1`): Utility that validate body froms request.
