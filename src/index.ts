import dotenv from 'dotenv';
dotenv.config()

import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';

import { readFileSync } from 'fs';
import path from 'path';
const typeDefs = readFileSync(path.join(__dirname , 'schema.graphql'), { encoding: 'utf-8' });

console.log("Restaurant Menu API V1.0")

//Build the schema for the menu
console.log("Building menu schema")
const schema = buildSchema(typeDefs);
console.log("built schema!")

const root = {
    hello(){
        return "Hello world!"
    }
}

const app = express()

//graphql hook into express

app.all(
    '/graphql',
    createHandler({
        schema: schema,
        rootValue: root
    })
)

app.listen(5466)

if(process.env.STAGE === 'dev'){
    console.log("We are in development mode. Run the helper GraphiQL IDE")
    const { ruruHTML } = require('ruru/server');
    // Serve the GraphiQL IDE.
    app.get('/', (_req, res) => {
        res.type('html');
        res.end(ruruHTML({ endpoint: '/graphql' }));
    });
    console.log('Running a GraphiQL API server at http://localhost:5466/')
}
console.log('Running a GraphQL API server at http://localhost:5466/graphql');