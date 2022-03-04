# graphql-typesafe-demo

## Creating the server

Install dependencies we need
```
npm i express graphql express-graphql cors
npm i -D @types
```

Write the server
```ts
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import people from './data.json';

const app = express();

app.use(cors())

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
```

### Showcase null-safety

Set something to null, see what happens when querying it.

### Showcase documentation

Add a documentation for something and show what happens in GraphiQL.

## Creating the client

We can query the server with no 3rd party libraries using fetch API.
We can type this manually but that's not cross-service type-safe.

```ts
import { useEffect, useState } from 'react'

function App() {
  const [people, setPeople] = useState([])

  useEffect(() => {
    const query = `
      query {
        people {
          name
          favoriteFood
        }
      }
    `;
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
      .then(res => res.json())
      .then(json => setPeople(json.data.people))
  }, []);


  return (
    <div className="App">
      <ul>
        {people.map(person => (
          <li key={person.name}>
            {person.name} likes {person.favoriteFood}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
```