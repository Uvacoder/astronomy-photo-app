import { useState, useEffect, createContext } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Likes from './layout/Likes'
import Layout from './layout/Layout'
import Container from './components/Container'

import data from './data/sampleData'

import './App.css'

import lozad from 'lozad'
import axios from 'axios'
import dayjs from 'dayjs'
import { debounce } from 'lodash'

export const DataContext = createContext();

function App() {
  
  // const [dateForApi, setDateForApi] = useState(dayjs())
  const [itemData, setItemData] = useState([])   
  const [isLoading, setIsLoading] = useState(false)
  const [dateStringForApi, setDateStringForApi] = useState({  
    // get date 10 days before today then format date in YYYY-MM-DD  
    startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
    endDateString: dayjs().format("YYYY-MM-DD"),    
    offset: 11,
  })
  const [likedItemData, setLikedItemData] = useState([])

  // if feedView is false, then gridView is active
  const [feedView, setFeedView] = useState(true)
  // if randomMode is false, chronological view is active
  const [randomMode, setRandomMode] = useState(false)
  // if card grid single is true, show the selected single post
  const [cardGridSingle, setCardGridSingle] = useState({
    selected: false, item: null})
  // if isSearching is true, date picker will appear
  const [isSearching, setIsSearching] = useState(false)
  const [searchDate, setSearchDate] = useState()
  const [searchMode, setSearchMode] = useState(false)
  const [lastInteraction, setLastInteraction] = useState("")
   

  const calculateDateForApi = () => {
    
    const offset = dateStringForApi.offset
    
    const endDateString = dayjs(dayjs().subtract(offset, "day")).format("YYYY-MM-DD")
    console.log("end date: ", endDateString);    
    
    const newOffset = offset + 10
    const newDate = dayjs().subtract(newOffset, "day")
    
    const startDateString = dayjs(newDate).format("YYYY-MM-DD")
    console.log("start date: ", startDateString);

    setDateStringForApi(prevData => {
      return ({
        ...prevData,
        startDateString: startDateString,
        endDateString: endDateString,    
        offset: newOffset + 1,    
      })
    })
  }

  const callApiByDate = () => {   
    
    setIsLoading(true)
    
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&start_date=${dateStringForApi.startDateString}&end_date=${dateStringForApi.endDateString}`)
    .then(function (response) {
      // handle success
      setItemData(prevData => (
        [
          ...prevData,
          ...response.data.reverse()
        ]
      ))
      setIsLoading(false)
      calculateDateForApi()
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
      console.log('callApiRandom')
    });
  }

  // first API call on app load
  // useEffect(() => {callApiRandom()}, [])
  useEffect(() => {callApiByDate()}, [searchDate]) 
  // useEffect(() => setItemData(data), [])
  
  
  // lazy load images listener
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
      // console.log('window.pageYOffset', window.pageYOffset);    
      // console.log('document.documentElement.offsetHeight', document.documentElement.offsetHeight);
      // const position = document.documentElement.scrollTop;
      

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
        console.log("infinite scroll v3")
        
        randomMode && isLoading === false ? callApiRandom() : callApiByDate()
        console.log(itemData);
        return
      }}

    const debounceHandleScroll = debounce(handleScroll, 800)

    // window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', debounceHandleScroll);

    return () => {
      // window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', debounceHandleScroll);
    };
  })

  // add or remove likes from likedItemData
  const handleLike = (item) => {
    
    const likedDates = likedItemData.map(item => item.date)
    
    likedDates.includes(item.date) ? 
      setLikedItemData(prevData => {
        let filterData = prevData;
        for (let i=0; i<filterData.length; i++) {
          if (filterData[i].date === item.date) {
            // console.log("remove like")
            filterData.splice(i, 1)
          }
        }
        return [...filterData]
      }) 
      // console.log(item)
      :
      setLikedItemData(prevData => ([...prevData, item]))
      // console.log("add like")    
  }

  // check if card is liked when rendering
  const checkLikedItems = (item) => {
    let like = false
    for (let i=0; i<likedItemData.length; i++) {
      if (likedItemData[i]?.date === item?.date) {
        like = true
      }
    }
    return like
  }
  
  const handleFeedView = () => {
    setFeedView(true);
  }

  const handleGridView = () => {
    setFeedView(false);
  }

  const handleRandomView = () => {    
    setRandomMode(true);
    setItemData([]);
    callApiRandom();
    setDateStringForApi({  
      // reset to initial values  
      startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
      endDateString: dayjs().format("YYYY-MM-DD"),    
      offset: 11,
    });    
  }

  const handleLatestView = () => {
    if (randomMode) {
      setRandomMode(false);      
      setItemData([]);
      callApiByDate();  
      setDateStringForApi({  
        // reset to initial values  
        startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
        endDateString: dayjs().format("YYYY-MM-DD"),    
        offset: 11,
    })
    }
    if (searchMode) {
      console.log("searching latest")
      setDateStringForApi({  
        // reset to initial values  
        startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
        endDateString: dayjs().format("YYYY-MM-DD"),    
        offset: 11,
      })
      setSearchDate();
      // closeDatePicker();
      // setRandomMode(false);
      setSearchMode(false);
      setItemData([]);
    }    
  }  

  // to scroll window to last interacted element
  useEffect(() => {    
    document.getElementById(lastInteraction)?.scrollIntoView();
    console.log("scroll to: ");
    console.log(lastInteraction);   
  }, [feedView])


  // freeze grid view and render a modal of selection
  const loadGridSingleView = (item) => {

    document.body.style.overflow = 'hidden';
    
    setCardGridSingle(prevState => {
      return ({
        ...prevState,
        selected: !prevState.selected,
        item: item,
      })      
    })        
  }
  
  // unfreeze grid view and close modal
  const unloadGridSingleView = () => {

    document.body.style.overflow = 'visible';

    setCardGridSingle(prevState => {
      return ({
        ...prevState,
        selected: !prevState.selected,
        item: null
      })      
    })
  }

  // scroll window to top of body
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // toggle the date picker for searching
  const handleDatePicker = () => {
    setIsSearching(prevState => !prevState)
  }

  const closeDatePicker = debounce(handleDatePicker, 600)

  // get the date searched for, reset the cards, call Api and render searched card
  const handleDateSearch = date => {
    
    // set date string for API
    // console.log(dayjs(searchDate).format("YYYY-MM-DD"))
    const searchDateInStringFormat = dayjs(date).format("YYYY-MM-DD");
    console.log(searchDateInStringFormat);
    const searchDateInDayjsFormat = dayjs(searchDateInStringFormat);
    const today = dayjs();
    const diff = today.diff(searchDateInDayjsFormat, 'day');
    console.log(diff);
    
    setDateStringForApi({
      startDateString: dayjs(dayjs(date).subtract(10, "day")).format("YYYY-MM-DD"),    
      endDateString: dayjs(date).format("YYYY-MM-DD"),    
      offset: diff + 11,
    })
    
    // call API by date
    // callApiByDate();
    setSearchDate(date);
    closeDatePicker();
    setRandomMode(false);
    setSearchMode(true);
    setItemData([]);
  }

  // gets the id of last interacted card element so window can scroll to element when switching view
  const handleInteraction = id => {
    // const debounceLastInteraction = debounce(() => setLastInteraction(id), 500);
    // debounceLastInteraction;
    setLastInteraction(id);
  }  

  // console.log(searchDate)
  console.log("likes: ")
  console.log(likedItemData)
  // console.log(cardGridSingle)
  // console.log(dateStringForApi)
  console.log(lastInteraction)
  
  const test = "test"
  const checkLikeSingleGrid = checkLikedItems(cardGridSingle.item)
  console.log(checkLikeSingleGrid)

  const data = {
    itemData,
    feedView,
    isLoading,
    cardGridSingle,
    handleLike,
    checkLikedItems,
    loadGridSingleView,
    unloadGridSingleView,
    checkLikeSingleGrid,
    handleInteraction,
    handleScrollToTop,
    isSearching,
    handleDatePicker,
    handleDateSearch,
    searchDate,
    handleRandomView,
    handleLatestView,
    handleFeedView,
    handleGridView
  }

  
  return (
    <DataContext.Provider value={data}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Container />} />
          <Route path="shuffle" element={<Container />} />
          <Route path="search" element={<Container />} />
          <Route path="/likes" element={<Likes />} />
          <Route path={`${test}`} element={<Likes />} />          
        </Route>
        
        <Route path="*" element="NOT FOUND" />
      </Routes>
    </BrowserRouter>
    </DataContext.Provider>
  )
}

export default App
