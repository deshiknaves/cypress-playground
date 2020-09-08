import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setData(json)
      })
  }, [])

  return (
    <div className="App">
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
      </div>
    </div>
  )
}

export default App
