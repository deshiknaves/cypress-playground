import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    getTodos()
  }, [])

  function getTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos/1', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        setData(json)
      })
  }

  async function fetchError() {
    await fetch('https://jsonplaceholder.typicode.com/fake').then(
      async response => {
        const json = await response.json()
        if (!response.ok) {
          setError(`Error: ${response.status}`)
          return
        }

        setData(json)
      },
    )
  }

  return (
    <div className="App">
      {error && <p>{error}</p>}
      {data && <p>{JSON.stringify(data, null, 2)}</p>}
      <h1>{message}</h1>
      <div>
        <button type="button" onClick={() => setMessage('First')}>
          First
        </button>
        <button type="button" onClick={() => setMessage('Second')}>
          Second
        </button>
        <button type="button" onClick={() => setMessage('Third')}>
          Third
        </button>
        <button type="button" onClick={fetchError}>
          Error
        </button>
        <button type="button" onClick={getTodos}>
          Refetch
        </button>
      </div>
    </div>
  )
}

export default App
