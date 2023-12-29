# Code Buddy API

This repository contains the backend API for the Code Buddy application, built using Express.js and MySQL. It serves as the backbone for handling data and business logic for various features like user authentication, chat, discussions, events, and notes. Still in development phase

## Features

- **Express.js Framework**: Utilizes Express.js for efficient API routing and server-side logic.
- **MySQL Database**: Leverages MySQL for data storage and retrieval.
- **User Authentication**: Implements user registration, login, and authentication using JSON Web Tokens (JWT).
- **API Endpoints**: Provides RESTful API endpoints for chat, discussions, events, notes, and user management.
- **Error Handling**: Includes a global error handling mechanism for streamlined error management.
- **Security Measures**: Implements security features like rate limiting, CORS, helmet, and XSS protection.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sfkse/code-buddy-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd code-buddy-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your MySQL database and update the .env file with your database credentials.

### Running the Application

Start the server:

```bash
nodemon index.js
```

## API Documentation

The API endpoints include:
`/api/v1/auth`: Authentication routes (login, register).
`/api/v1/users`: User-related routes.
`/api/v1/notes`: Routes for managing personal notes.
`/api/v1/events`: Event management routes.
`/api/v1/discussions`: Discussion forum routes.

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit pull requests. If you find any issues or have suggestions, please open an issue in the GitHub repository.
