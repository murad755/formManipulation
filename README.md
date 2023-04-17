# testProject

## Assuming you have installed:

-   [Node](https://nodejs.org/en/download/) above 8.x.x
-   [npm](https://www.npmjs.com/)

## Run locally:

1. Type `npm install` to install dependencies
2. Type `npm run prepare` to install husky hooks
3. Run `export $(cat .env.example | xargs)` to set environment variables
4. Type `npm start:headed` to start cypress headed mode or `npm start:headless` to start cypress headless mode
5. Run precommit hooks with `npm run precommit`

# Environment variables

-   `CYPRESS_BASE_URL` - base url for the application
