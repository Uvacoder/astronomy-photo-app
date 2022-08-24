import { useState, useEffect } from 'react'

import Card from './Card'
import data from './data'
import './App.css'

function App() {
  const [imgData, setImgData] = useState([])
  
  


  // gets 20 random images from APOD
  const callAPODApi = () => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&count=20")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // if media type is not image, to use the 2nd response
      setImgData(data)
    });
  }


  useEffect(() => {callAPODApi()}, [])

  // useEffect(() => setImgData(data), [])
  
  const cards = imgData.map(item => (
    <Card
      title={item?.title}
      url={item?.url}
      explanation={item?.explanation}
      date={item?.date}
      
      />
  ))

  return (
    <div className="App">
        <h1>Astronomy</h1>
        
        <input placeholder='search' />
        <input type='submit' />
        
        <button style={{marginLeft: "20px"}}>View Likes</button>
        

        {cards}
         
        
    </div>
  )
}

export default App
