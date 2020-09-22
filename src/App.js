import React, { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const fetched = useRef(false)
  const [message, setMessage] = useState()

  function createTodo() {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        userId: 1,
        complete: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setMessage(json)
      })
  }

  useEffect(() => {
    console.log(fetched.current)
    if (!message || fetched.current) return
    fetched.current = true
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          console.log(json)
          setMessage([message, json])
        })
    }, 1000)
  }, [message])

  return (
    <div className="App">
      <h1>{JSON.stringify(message, null, 2)}</h1>
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
        <button type="button" onClick={createTodo}>
          Create Todo
        </button>
      </div>
    </div>
  )
}

export default App
