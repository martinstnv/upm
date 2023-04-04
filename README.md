# UPM - The Unencrypted Password Manager

## Prerequisites

- NodeJS
- NPM
- PostgreSQL

## Installation

Install the Node modules.

```
npm install --prefix ./server
npm install --prefix ./client
```

Set up the database.

```
psql -U username -d myDataBase -a -f ./db/init.sql
```

Set the environment variables in `.env` on both the client and the server.

## Start the application

1. Start the server using `node ./src/index.js`.
2. Start the client client using `npm run start`.