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
