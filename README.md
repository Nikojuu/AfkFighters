# AFK Fighters

## Project URL

The project is live at: [Afk Fighters](https://afk-fighters.vercel.app/)

## Description

Afk Fighters is a website where you can start galactic battles between 2 animals trapped in space, for no apparent reason other than the fact that these animals just like fighting each other. Watch them duke it out in the vastness of space!

## MVP-features

1. Visuaally stunning
2. Initiating battles between fighters and viewing them in real-time
3. Dashboard to track analytics of fight history and fighters
4. All fighters page to show all fighters
5. Individual fighter page for all details about the fighter
6. User account creation and login and admin authentication
7. Create new fighter for admin privleges

## Technologies

- Frontend: HTML, CSS, JavaScript, NextJs, TypeScript
- Backend: NextJS
- Database: PostgreSQL

## Endpoints (seperated route handlers and server actions since its NextJs)

### Route handlers

- **POST /api/create-fighters-table(TEMP)**: Temporary endpoint to create fighter table
- **DELETE /api/delete-old-records**: delete fight history when there are 100+ records to spare database storage
- **POST /api/fighters**: fetch 2 random fighters from database (this could be handled better in server action)
- **POST /api/image-reshape**: Endpoint to resize image and saving it to public folder
- **POST /api/populate-database(TEMP)**: this parses throught json file and push them into database i do not dare to delete this endpoint
- **GET /api/fighter/[slug]**: Endpoint to get specific fighter based of slug parameter

### Server actions (NextJs specific functions that are run on serverside and allow mutations) located in services/actions.ts

- **const fightLogic()**: this function takes in 2 fighters and elemental and returns winner of the fight
  as well as updates statistics in database accordingly

- **const createFighter()**: This function takes in data from form validates it and then creates new fighter in database

- **const getAllfighters()**: Gets all fighters from database

## Installation

Note: If you just want to view the project, you can use the public URL at: [Afk Fighters](https://afk-fighters.vercel.app/). However, if you want to run it locally, ensure you have access to VerceI's database and Clerk authentication keys.

1. Clone the repository to your local machine: `git clone https://github.com/your-username/afk-fighters.git`
2. Navigate to the project directory: `cd afk-fighters`
3. Install the necessary dependencies: `npm install`
4. Create a `.env` file in the root directory and add the required environment variables (e.g., database connection string, API keys, etc.).
   ### Database

```plaintext
POSTGRES_URL="your VerceI PostgreSQL URL"
POSTGRES_PRISMA_URL="your VerceI PostgreSQL Prisma URL"
POSTGRES_URL_NO_SSL="your VerceI PostgreSQL URL without SSL"
POSTGRES_URL_NON_POOLING="your VerceI PostgreSQL URL for non-pooling connections"
POSTGRES_USER="your PostgreSQL username"
POSTGRES_HOST="your PostgreSQL host"
POSTGRES_PASSWORD="your PostgreSQL password"
POSTGRES_DATABASE="your PostgreSQL database name"

// clerk authentication

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your Clerk publishable key"

```

5. Start the application: `npm run dev`
