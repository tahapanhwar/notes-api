# Notes API

I built this project to learn backend development. It's a REST API where users can register, log in, and manage their own private notes.

## What it does
- Register and login (passwords are hashed with bcrypt)
- Login gives a JWT token
- A middleware checks the token before letting anyone reach the notes
- Every user can only see, edit and delete their own notes
- Basic error handling, so the server doesn't crash on bad input

## How to run it
1. Clone the repo and run `npm install`
2. Copy `.env.example` to `.env` and put your own values
3. Make sure MongoDB is running
4. Run `npm run dev`

The server starts on port 3000.

## Endpoints

| Method | URL | Token needed | What it does |
|---|---|---|---|
| POST | /api/auth/register | No | Create an account |
| POST | /api/auth/login | No | Login and get a token |
| GET | /api/notes | Yes | Get all my notes |
| POST | /api/notes | Yes | Create a note |
| PUT | /api/notes/:id | Yes | Update a note |
| DELETE | /api/notes/:id | Yes | Delete a note |

For protected routes, send the token in the header like this:
`Authorization: Bearer <your token>`

## Built with
Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## What I want to add next
- A frontend to use this API
- Deploy it online