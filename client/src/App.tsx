import { gql, useQuery } from "@apollo/client"

import { PeopleDocument, PeopleQuery } from "../graphql/generated"

gql`
  query People {
    people {
      name
      favoriteFood
    }
  }
`

function App() {
  const { data, loading } = useQuery<PeopleQuery>(PeopleDocument)

  if (loading) return <h1>"loading..."</h1>

  return (
    <div className="App">
      <ul>
        {data?.people?.map(person => (
          <li key={person.name}>
            {person.name} likes {person.favoriteFood}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
