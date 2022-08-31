import { useState, useEffect } from 'react'

import Card from './Card'
import data from './data'
import './App.css'

import lozad from 'lozad'
import axios from 'axios'

function App() {
  const [itemData, setItemData] = useState([])   


  // gets 10 random images from APOD
  // const callApiRandom = () => {
  //   fetch("https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&count=10")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data)
  //     setImgData(prevData => (
  //       [
  //         ...prevData,
  //         ...data
  //       ]
  //     ))
  //   });
  // }

  const callApiRandom = () => {
    
    axios.get("https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&count=10")
    .then(function (response) {
      // handle success
      console.log(response.data);
      setItemData(prevData => (
        [
          ...prevData,
          ...response.data
        ]
      ))
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }


  useEffect(() => {callApiRandom()}, [])

  // useEffect(() => setImgData(data), [])
  
  const cards = itemData.map(item => (
    <Card
      title={item?.title}
      url={item?.url}
      explanation={item?.explanation}
      date={item?.date}
      
      />
  ))

  // lazy load images
  useEffect(() => {
    const observer = lozad('.lozad', {
      rootMargin: '600px 0px', // syntax similar to that of CSS Margin
      threshold: 0.1, // ratio of element convergence
      enableAutoReload: true // it will reload the new image when validating attributes changes
    });
    observer.observe();
  })

  // scroll to bottom event listener
  useEffect(() => {
    const handleScroll = event => {
      // console.log('Math.ceil(document.documentElement.scrollTop)', Math.ceil(document.documentElement.scrollTop));
      // console.log('window.innerHeight', window.innerHeight);      
      // console.log('document.documentElement.offsetHeight', document.documentElement.offsetHeight);
      if (Math.floor(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {
        console.log("infinite scroll v1")     
           
        callApiRandom();
        console.log(itemData);
        return
      } else if (Math.ceil(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {
        console.log("infinite scroll v2")     
           
        callApiRandom();
        console.log(itemData);
        return
      } else if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
        console.log("infinite scroll v1")
        
        callApiRandom();
        console.log(itemData);
        return
      }}

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])



  return (
    <div className="App bg-neutral-900 text-slate-50">
        <h1 class="font-sans text-xl">Astronomy</h1>
        
        
        <input placeholder='search' />
        <input type='submit' />
        
        <button style={{marginLeft: "20px"}}>View Likes</button>        

        {cards}
         
        
    </div>
  )
}

export default App
