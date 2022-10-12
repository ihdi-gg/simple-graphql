install global:
- nodemon

dependancy:
type-graphql 1.1 dependendancy to graphql 15.3

Refer To:
https://www.freecodecamp.org/news/how-to-use-typescript-with-graphql/


How to use:

```
query getUser {
  getUser(id: 1) {
    id
    name
  }
  getUsers {
    id
    name
    email
  }
}

mutation user($input: UserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}

mutation updateUser($id: Int!, $input: UserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
  }
}
```

Sample variable for update:
```
{
  "id": 1,
  "input": {
    "name": "Dean doe",
    "email": "dean.doe@gmail.com"
  }
}
```
