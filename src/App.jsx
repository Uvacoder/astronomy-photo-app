import { useState, useEffect } from 'react'

import Card from './Card'
import LoadingSpinner from './LoadingSpinner'

import data from './data'
import './App.css'

import lozad from 'lozad'
import axios from 'axios'

let date, startDate, endDate;

date = new Date();
date.setDate(date.getDate()-10);
startDate = date.toISOString().slice(0, 10);
console.log(startDate);
// ---
date.setDate(date.getDate()-1);
endDate = date.toISOString().slice(0, 10);
console.log(endDate);
date.setDate(date.getDate()-9);
startDate = date.toISOString().slice(0, 10);
console.log(startDate);
// ---



function App() {
  const [itemData, setItemData] = useState([])   
  const [isLoading, setIsLoading] = useState(false)
  const [dateForApi, setDateForApi] = useState({
    date: new Date(),
    startDate: null,
    endDate: null
  })

  const callApiRandom = () => {
    setIsLoading(true)
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
      setIsLoading(false)
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
  
  const cards = itemData.map(item => {
    if (item?.media_type === "image") {
      return (
        <Card
        title={item?.title}
        url={item?.url}
        explanation={item?.explanation}
        date={item?.date}
        />
      )
    }
  })

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
        <h1 className="font-sans text-xl">Astronomy</h1>
        
        
        <input placeholder='search' />
        <input type='submit' />
        
        <button style={{marginLeft: "20px"}}>View Likes</button>        

        {cards}
        {isLoading && <LoadingSpinner />}
        
         
        
    </div>
  )
}

export default App
