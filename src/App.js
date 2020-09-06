import React, { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState()
  return (
    <div className="App">
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
