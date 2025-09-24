# Joro Blog
A simple CRUD blog with Express/MongoDB backend and React frontend.

## Prereqs
- Node 18+ and npm
- MongoDB running locally

## Setup
**1) Backend**
cd backend
cp .env.example .env   # edit if needed
npm install
npm run dev            # starts at http://localhost:5000
You should see `MongoDB connected` in the console.

**2) Frontend**
Open a second terminal:
cd frontend
npm install
npm run dev            # starts at http://localhost:5173

The app assumes API at `http://localhost:5000/api`. To change, run dev with:

VITE_API_BASE=http://localhost:5000/api npm run dev

## Features
- Add, view, edit, delete posts
- Search by title
- Timestamps stored in Mongo (not shown, but available)
- Bootstrap styling

## API (for Postman)
Import `backend/postman_collection.json` into Postman.
