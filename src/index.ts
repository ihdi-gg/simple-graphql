import { buildSchema } from "graphql";
import express from 'express';
import { graphqlHTTP } from 'express-graphql'

const users = [
    {id: 1, name: 'John Doe', email: 'john.doe@gmail.com'},
    {id: 2, name: 'Jane Doe', email: 'jane.doe@gmail.com'},
    {id: 3, name: 'Mike Doe', email: 'mike.doe@gmail.com'},
]

const schema = buildSchema(`
    input UserInput {
        email: String!
        name: String!
    }

    type User {
        id: Int!
        name: String!
        email: String!
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(id: Int!, input: UserInput): User
    }

    type Query {
        getUser(id: Int!): User
        getUsers: [User]
    }
`);

type User = {
    id: number
    name: string
    email: string
}

type UserInput = Pick<User, 'email' | 'name'>

const createUser = (args: {input: UserInput}): User => {
    const user = {
        id: users.length + 1,
        ...args.input
    }

    users.push(user)
    return user
}

const updateUser = (args: {id: number, input: UserInput}): User => {
    const index = users.findIndex(u => u.id === args.id)
    const targetUser = users[index]
    if (targetUser) {
        users[index] = {
            id: args.id,
            ...args.input
        }
    }
    return users[index]
}

const getUser = (args: {id: number}): User | undefined =>
    users.find(user => user.id === args.id)

const getUsers = (): User[] => users

const root = {
    getUser,
    getUsers,
    createUser,
    updateUser
}

const app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    })
)

const PORT = 8001
app.listen(PORT)
console.log(`Running Graphql API Server at http://localhost:${PORT}/graphql`)