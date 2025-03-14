# Restaurant Menu API

A restaurant menu api, written in NodeJS with typescript

## Installation instructions

Please install and configure the following software

- Node 22.10.0
- npm v10.9 and above
- Yarn: https://yarnpkg.com/getting-started/install
```bash
    corepack enable
    yarn init -2
```

Then run

```bash
    yarn install
```

NOTE: under normal circumstances, never commit the .env file, but in this case to save setup time, it has been included

To run the application, please run the following command:
```bash
   yarn dev
```

To test the application, please run the following command:

```bash
   yarn test
```

## Running the server

Testing the server can be done with the bundled GraphiQL, which is provided as a web client via 'localhost:5466/'. This will not be included if the environment variable `STAGE` is not `dev`

The graphql API can be found at 'localhost:5466/graphql'

## Dependencies used

Please see the package.json for the dependencies, but any notes worth mentioning are below

### TS-Node

run typescript code, since node does not have stable support for typescript natively yet. Node22 includes experimental native suppoort, but I am not using it at the moment.