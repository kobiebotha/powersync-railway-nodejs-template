# PowerSync Railway + Node.js + Firebase Backend: Demo

## Overview
This repo contains a demo Node.js server application which has HTTP endpoints to authorize a [PowerSync](https://www.powersync.com/) enabled application to sync data between a client device and a PostgresSQL database. This repo is intended for use as a template on Railway.app.

The endpoints are as follows:

1. GET `/api/auth/token`

   - PowerSync uses this endpoint to retrieve a JWT access token which is used for authentication. 

2. GET `/api/auth/keys`

   - PowerSync uses this endpoint to validate the JWT returned from the endpoint above.

3. PUT `/api/data`

   - PowerSync uses this endpoint to sync upsert events that occurred on the client application.

4. PATCH `/api/data`

   - PowerSync uses this endpoint to sync update events that occurred on the client application.

5. DELETE `/api/data`

    - PowerSync uses this endpoint to sync delete events that occurred on the client application.

The repo also has an integration with [Firebase](https://firebase.google.com/docs/auth) to validate a token provided in the header of the `/api/auth/token` endpoint.

## Packages
- [node-postgres](https://github.com/brianc/node-postgres)  is used to interact with the Postgres database when a PowerSync enabled client performs requests to the `/api/data` endpoint.
- [jose](https://github.com/panva/jose) is used to sign the JWT which PowerSync uses for authorization.
- [firebase-admin](https://github.com/firebase/firebase-admin-node) is used to connect to Firebase and the `verifyIdToken` function is used to validate the client application request before the app generates a JWT used by PowerSync to sync data.

## Running the app

1. Clone the repository

2. Follow the steps outlined in [PowerSync Custom Authentication Example](https://github.com/journeyapps/powersync-jwks-example) → [Generate a key-pair](https://github.com/journeyapps/powersync-jwks-example#1-generate-a-key-pair) to get the key pair you need for this app. This is an easy way to get started with this demo app. You can use your own public/private keys as well.

3. Create a new `.env` file in the root project directory and add the variables as defined in the `.env` file:
```shell
cp .env.template .env
```
4Install dependencies:
```shell
nvm use
```
```shell
yarn install
```
## Start App
1. Run the following to start the application
```shell
yarn start
```
This will start the app on `http://127.0.0.1:PORT`, where PORT is what you specify in your `.env` file.

2. Test if the app is working by opening `http://127.0.0.1:PORT/api/auth/token/` in the browser

3. You should get a JSON object as the response to that request
