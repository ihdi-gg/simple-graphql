import 'reflect-metadata';
import { buildSchema } from "type-graphql";
import express from 'express';
import { graphqlHTTP } from 'express-graphql'
import { UsersResolver } from "./users/resolver";


async function main() {
    const schema = await buildSchema({
        resolvers: [UsersResolver],
        emitSchemaFile: true
    });

    const app = express();
    app.use(
        '/graphql',
        graphqlHTTP({
            schema,
            graphiql: true
        })
    )

    const PORT = 8000
    app.listen(PORT)
    console.log(`Running Graphql API Server at http://localhost:${PORT}/graphql`)
}

(async () => {
    main()
})()