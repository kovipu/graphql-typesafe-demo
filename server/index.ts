import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import people from './data.json';

const app = express();

const schema = `
  type Query {
    people: [Person!]
  }

  type Person {
    id: ID!
    name: String!
    favoriteFood: String!
  }
`;

const root = {
  people: () => people
}

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(schema),
  rootValue: root,
  graphiql: true,
}));

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});