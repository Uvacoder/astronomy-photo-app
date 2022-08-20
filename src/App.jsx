import { useState, useEffect } from 'react'

import './App.css'
const remove = ["and", "the", "is", "a", "on", "of", "under", "over", "or"]
function App() {
  const [count, setCount] = useState(0)
  const callAPI = () => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&count=10")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    });
  }

  useEffect(() => {callAPI()}, [])

  return (
    <div className="App">
        Astronomy
    </div>
  )
}

export default App
