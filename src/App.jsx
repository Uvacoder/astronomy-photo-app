import { useState, useEffect } from 'react'

import Card from './components/Card'
import LoadingSpinner from './components/LoadingSpinner'
import Navbar from './components/Navbar'

import data from './data/sampleData'
import daysPerMonth from './data/daysPerMonth'

// import { calculateDateForApi } from './functions/apiFunctions'

import './App.css'

import lozad from 'lozad'
import axios from 'axios'

const dateForApi = new Date()

function App() {

  const today = new Date()
  const [itemData, setItemData] = useState([])   
  const [isLoading, setIsLoading] = useState(false)
  const [dateStringForApi, setDateStringForApi] = useState({     
    startDateString: "",    
    endDateString: "",    
  })
  // if postView is false, then gridView is active
  const [postView, setPostView] = useState(true)
  const [randomMode, setRandomMode] = useState(true)

  const calculateDateForApi = (date) => {
    
    // console.log(date.getMonth(), date.getDate())    
    const endDateString = date.toISOString().slice(0, 10);
    console.log("end date: ", endDateString);
    
    // sets date to the last day of previous month
    date.setDate(0)
    const startDateString = date.toISOString().slice(0, 10);
    console.log("start date: ", startDateString);

    setDateStringForApi(prevData => {
      return ({
        ...prevData,
        startDateString: startDateString,
        endDateString: endDateString,        
      })
    })
    // set the next end date for API to call
    // check num of days in months with data in daysPerMonth.js
    for (const month of daysPerMonth) {
      if (month.index === date.getMonth()) {
        date.setDate(month.days - 1)
      }
    }
    // check Feb
    if (date.getMonth() === 1) {
      // check leap years
      const checkYear = date.getFullYear()
      let isLeap = new Date(checkYear, 1, 29).getMonth()
      if (isLeap === 1) {
        date.setDate(28)
      } else {
        date.setDate(27)
      }
    }     
  }

  const callApiByDate = () => {   
    
    setIsLoading(true)
    calculateDateForApi(dateForApi)
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&start_date=${dateStringForApi.startDateString}&end_date=${dateStringForApi.endDateString}`)
    .then(function (response) {
      // handle success
      // console.log(response.data);
      // calculateDateForApi(dateForApi)
      setItemData(prevData => (
        [
          ...prevData,
          ...response.data.reverse()
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


  useEffect(() => {callApiRandom(); calculateDateForApi(today)}, [])
  // useEffect(() => {calculateDateForApi(today), callApiByDate()}, [])
  

  // useEffect(() => setImgData(data), [])
  
  // map cards
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
           
        randomMode && isLoading === false ? callApiRandom() : callApiByDate()
        console.log(itemData);
        return
      } else if (Math.ceil(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {
        console.log("infinite scroll v2")     
           
        randomMode && isLoading === false ? callApiRandom() : callApiByDate()
        console.log(itemData);
        return
      } else if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
        console.log("infinite scroll v1")
        
        randomMode && isLoading === false ? callApiRandom() : callApiByDate()
        console.log(itemData);
        return
      }}

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  })

  const handleMode = () => {
    setRandomMode(prevState => !prevState)
    console.log("mode: ", randomMode)
    setItemData([])
    randomMode ? callApiByDate() : callApiRandom()
  }

  console.log(dateStringForApi)

  return (
    <div className="bg-neutral-900 text-slate-50">
        <Navbar 
          postView={postView} 
          randomMode={randomMode} 
          handleMode={handleMode}
          />
        
        <div className='mt-16 ml-5'>
          {cards}
          {isLoading && <LoadingSpinner />}
        </div>
         
        
    </div>
  )
}

export default App
