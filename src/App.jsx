import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [imgData, setImgData] = useState("")
  const [img2Data, setImg2Data] = useState("")
  const [img3Data, setImg3Data] = useState("")
  const [img4Data, setImg4Data] = useState("")


  // gets 2 random images from APOD
  const callAPODApi = () => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&count=2")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // if media type is not image, to use the 2nd response
      setImgData(data)
    });
  }

  const callAnimeApi = () => {
    fetch('https://animechan.vercel.app/api/quotes')
      .then(response => response.json())
      .then(quotes => console.log(quotes))
  }

  const callImageApi = () => {
    fetch("https://images-api.nasa.gov/search?media_type=image&keywords=mars")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      
      setImg3Data(data)
      console.log(img3Data?.collection?.items?.[0].href)
      if (img3Data) {
        getImage()
      }
    })
  }

  const getImage = () => {
    fetch(img3Data?.collection?.items?.[0].href)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setImg4Data(data?.[0])
  })}

  useEffect(() => {/*callAPODApi(),*/ callAnimeApi()}, [])
  // useEffect(() => {/*callAPODApi(),*/ getImage()}, [])

  return (
    <div className="App">
        <h1>Astronomy</h1>
        
        {/*
        <input placeholder='search' />
        <input type='submit' />
        
        
        <button style={{marginLeft: "20px"}}>View Likes</button>
        
        <h3>APOD API: {imgData?.[0]?.title}</h3>
        <img style={{maxWidth: "40%", display: "block"}} src={imgData?.[0]?.url} />
        <button>Like</button>
        
        <button>View on NASA</button>
        <p>{imgData?.[0]?.explanation}</p>
        <p>{imgData?.[0]?.date}</p>

         <h3>EPIC API</h3> 
        {/* <img style={{maxWidth: "40%", display: "block"}} 
          src={`https://epic.gsfc.nasa.gov/archive/natural/${img2Data?.[0]?.identifier.slice(0,4)}/${img2Data?.[0]?.identifier.slice(4,6)}/${img2Data?.[0]?.identifier.slice(6,8)}/png/${img2Data?.[0]?.image}.png`} />

        <h3>Image API</h3>
        <img style={{maxWidth: "40%", display: "block"}} 
          src={img4Data} />*/}
        
    </div>
  )
}

export default App
