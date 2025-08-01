# Note App API

A simple RESTful API built with **Express.js** and **Mongoose** for managing notes and users.

## Features

- User registration and management
- CRUD operations for notes
- MongoDB integration using Mongoose
- Organized route structure

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB Atlas account or local MongoDB server

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   The server will run on [http://localhost:5000](http://localhost:5000).

## API Endpoints

### Root

- `GET /`  
  Returns a welcome message.

### Notes

- `GET /notes`  
  Get all notes.

- `POST /notes`  
  Create a new note.

- `GET /notes/:id`  
  Get a note by ID.

- `PUT /notes/:id`  
  Update a note by ID.

- `DELETE /notes/:id`  
  Delete a note by ID.

### Users

- `GET /users`  
  Get all users.

- `POST /users`  
  Register a new user.

- `GET /users/:id`  
  Get a user by ID.

- `PUT /users/:id`  
  Update a user by ID.

- `DELETE /users/:id`  
  Delete a user by ID.

## Project Structure

```
src/
  app.ts
  server.ts
  app/controllers/
    notes.controller.ts
    user.controllers.ts
```
