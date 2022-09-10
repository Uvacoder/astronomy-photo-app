import { useState, useEffect } from 'react'

import Card from './components/Card'
import LoadingSpinner from './components/LoadingSpinner'
import Navbar from './components/Navbar'
import CardGridSelection from './components/CardGridSelection'

import data from './data/sampleData'

import './App.css'

import lozad from 'lozad'
import axios from 'axios'
import dayjs from 'dayjs'
import { debounce } from 'lodash'


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

  // if postView is false, then gridView is active
  const [postView, setPostView] = useState(true)
  // if randomMode is false, chronological view is active
  const [randomMode, setRandomMode] = useState(true)
  // if card grid single is true, show the selected single post
  const [cardGridSingle, setCardGridSingle] = useState({
    selected: false, item: null})

  const calculateDateForApi = () => {
    
    // console.log(date.getMonth(), date.getDate())    
    // console.log(dateStringForApi.offset)
    const offset = dateStringForApi.offset
    // const endDateString = dateForApi.toISOString().slice(0, 10);
    const endDateString = dayjs(dayjs().subtract(offset, "day")).format("YYYY-MM-DD")
    console.log("end date: ", endDateString);
    
    // sets date to the last day of previous month
    // date.setDate(0)
    // setDateForApi(dateForApi.setDate(0))
    // setDateForApi(dayjs(dateForApi).subtract(10, "day"))
    // console.log(dayjs(dateForApi).subtract(10, "day"))
    const newOffset = offset + 10
    const newDate = dayjs().subtract(newOffset, "day")
    // setDateForApi(newDate)
    // console.log("new date ", dateForApi)
    // const startDateString = dateForApi.toISOString().slice(0, 10);
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
    // calculateDateForApi()
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
    });
  }

  // first API call on app load
  useEffect(() => {callApiRandom()}, [])
  // useEffect(() => {calculateDateForApi(today), callApiByDate()}, []) 
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
      // setCardGridSingle(prevState => {
      //   return ({
      //     ...prevState,
      //     position: position,
      //   })
      // })

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


  // // scroll y position listener
  // useEffect(() => {
  //   const handleYPosition = () => {
  //     const position = document.documentElement.scrollTop
  //     setCardGridSingle(prevState => {
  //       return ({
  //         ...prevState,
  //         position: position,
  //       })
  //     })
  //   }
  //   window.addEventListener('scroll', handleYPosition);

  //   return () => {
  //     window.removeEventListener('scroll', handleYPosition);
  //   };
  // })

  const handleMode = () => {

    setRandomMode(prevState => !prevState)
    setDateStringForApi({  
      // reset to initial values  
      startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
      endDateString: dayjs().format("YYYY-MM-DD"),    
      offset: 11,
    })
    setItemData([])
    randomMode ? callApiByDate() : callApiRandom()
  }

  const handleLike = (item) => {
    
    const likedDates = likedItemData.map(item => item.date)
    // console.log(likedDates)

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

  const checkLikedItems = (item) => {
    let like = false
    for (let i=0; i<likedItemData.length; i++) {
      if (likedItemData[i].date === item?.date) {
        like = true
      }
    }
    return like
  }
  

  const handleView = () => {
    setPostView(prevState => !prevState)
  }

  const loadGridSingleView = (item) => {

    // const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    // console.log(scrollY);
    // const body = document.body;
    // body.style.position = 'fixed';
    // body.style.top = `-${scrollY}`;
    // body.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    // body.style.top = `-${cardGridSingle.position}`;

    setCardGridSingle(prevState => {
      return ({
        ...prevState,
        selected: !prevState.selected,
        item: item,
      })      
    })        
  }

  const unloadGridSingleView = () => {

    // const body = document.body;
    // const scrollY = body.style.top;
    // body.style.position = '';
    // body.style.top = '';
    // window.scrollTo(0, parseInt(scrollY || '0') * -1);
    document.body.style.overflow = 'visible';

    setCardGridSingle(prevState => {
      return ({
        ...prevState,
        selected: !prevState.selected,
        item: null
      })      
    })
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  

  // map cards
  const cards = itemData.map(item => {
    if (item?.media_type === "image") {
      // console.log("mapping cards")
      // const like = likedItemData.includes(item) ? true : false
      // let like = false;
      // for (let i=0; i<likedItemData.length; i++) {
      //   if (likedItemData[i].date === item.date) {
      //     like = true
      //   }
      // }
      // console.log(like)
      const like = checkLikedItems(item)

      return (
        <Card
          item={item}
          like={like}
          handleLike={handleLike}
          postView={postView}
          loadGridSingleView={loadGridSingleView}
        />
      )
    }
  })


  console.log(cardGridSingle)
  console.log("likes: ")
  console.log(likedItemData)
  // console.log(cardGridSingle)

  return (
    <div className={`bg-neutral-900 text-slate-50 ${cardGridSingle.selected && "overflow-y-hidden"}`}>
        <Navbar 
          postView={postView} 
          randomMode={randomMode} 
          handleMode={handleMode}
          handleView={handleView}
          handleScrollToTop={handleScrollToTop}
        />
        
        {postView ? 
        // post view
        <div className='mt-16 ml-5'>         
          {cards}
          {isLoading && <LoadingSpinner />}
        </div> :
        // grid view
        <div className='grid grid-cols-3 gap-4 justify-center mt-16'>
          {cards}
          {isLoading && <LoadingSpinner />}
        </div>
        }
        {
          cardGridSingle.selected && 
          <CardGridSelection 
            item={cardGridSingle.item} 
            position={cardGridSingle.position}
            handleLike={handleLike}
            // loadGridSingleView={loadGridSingleView}
            unloadGridSingleView={unloadGridSingleView}
            like={checkLikedItems(cardGridSingle.item)}
            />
        }
        
    </div>
  )
}

export default App
