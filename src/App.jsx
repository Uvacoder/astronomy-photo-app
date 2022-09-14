import { useState, useEffect, createContext } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Likes from './layout/Likes'
import Layout from './layout/Layout'
import Container from './components/Container'
import Albums from './layout/Albums'

import data from './data/sampleData'

import './App.css'

import lozad from 'lozad'
import axios from 'axios'
import dayjs from 'dayjs'
import { debounce } from 'lodash'

export const DataContext = createContext();

function App() {
  
  // ------------------- STATES ------------------------------------------------
  const [itemData, setItemData] = useState([])   
  // const [isLoading, setIsLoading] = useState(false)
  const [dateStringForApi, setDateStringForApi] = useState({  
    // get date 10 days before today then format date in YYYY-MM-DD  
    startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
    endDateString: dayjs().format("YYYY-MM-DD"),    
    offset: 11,
  })
  const [likedItemData, setLikedItemData] = useState([])
  const [albumData, setAlbumData] = useState({
    form: "",
    albums: [
      {
        name: "Album One",
        data: [
          {
            "copyright": "David Cortner",
            "date": "2014-08-24",
            "explanation": "What's that dot on the Sun? If you look closely, it is almost perfectly round.  The dot is the result of an unusual type of solar eclipse that occurred in 2006.  Usually it is the Earth's Moon that eclipses the Sun.  This time, the planet Mercury took a turn.  Like the approach to New Moon before a solar eclipse, the phase of Mercury became a continually thinner crescent as the planet progressed toward an alignment with the Sun.  Eventually the phase of Mercury dropped to zero and the dark spot of Mercury crossed our parent star.  The situation could technically be labeled a Mercurian annular eclipse with an extraordinarily large ring of fire.  From above the cratered planes of the night side of Mercury, the Earth appeared in its fullest phase.  Hours later, as Mercury continued in its orbit, a slight crescent phase appeared again.  The next Mercurian solar eclipse will occur in 2016.",
            "hdurl": "https://apod.nasa.gov/apod/image/1408/mercurytransit_cortner_1200.jpg",
            "media_type": "image",
            "service_version": "v1",
            "title": "Mercury's Transit: An Unusual Spot on the Sun",
            "url": "https://apod.nasa.gov/apod/image/1408/mercurytransit_cortner_960.jpg"
          },
          {
            "copyright": "Ian Griffin",
            "date": "2019-02-09",
            "explanation": "Comet Iwamoto (C/2018 Y1), shows off a pretty, greenish coma at the upper left in this telescopic field of view. Taken on February 4 from the Mount John Observatory, University of Canterbury, the 30 minute long total exposure time shows the comet sweeping quickly across a background of stars and distant galaxies in the constellation Virgo. The long exposure and Iwamoto's rapid motion relative to the stars and galaxies results in the noticeable blurred streak tracing the the comet's bright inner coma. In fact, the streaked coma gives the comet a remarkably similar appearance to Messier 104 at lower right, popularly known as the Sombrero Galaxy. The comet, a visitor to the inner Solar System, is a mere 4 light-minutes away though, while majestic Messier 104, a spiral galaxy posing edge-on, is 30 million light-years distant. The first binocular comet of 2019, Iwamoto will pass closest to Earth on February 12. This comet's highly elliptical orbit around the Sun stretches beyond the Kuiper belt with an estimated 1,371 year orbital period. That should bring it back to the inner Solar System in 3390 AD.",
            "hdurl": "https://apod.nasa.gov/apod/image/1902/Iwamoto-104-2019griffin.jpg",
            "media_type": "image",
            "service_version": "v1",
            "title": "Comet Iwamoto and the Sombrero Galaxy",
            "url": "https://apod.nasa.gov/apod/image/1902/Iwamoto-104-2019griffin_1024.jpg"
          },
        ]
      },
    
      {
        name: "Album Two",
        data: [
          {
            "copyright": "Babak Tafreshi",
            "date": "2014-02-07",
            "explanation": "Stars come out as evening twilight fades in this serene skyscape following the Persian proverb \"Night hides the world, but reveals a universe.\" In the scene from last November, the Sun is setting over northern Kenya and the night will soon hide the shores of Lake Turkana, home to many Nile crocodiles. That region is also known as the cradle of humankind for its abundance of hominid fossils. A brilliant Venus, then the world's evening star, dominates the starry night above. But also revealed are faint stars, cosmic dust clouds, and glowing nebulae along the graceful arc of our own Milky Way galaxy.",
            "hdurl": "https://apod.nasa.gov/apod/image/1402/NightHidesTurkanaTafreshi.jpg",
            "media_type": "image",
            "service_version": "v1",
            "title": "Night Hides the World",
            "url": "https://apod.nasa.gov/apod/image/1402/NightHidesTurkanaTafreshi.jpg"
          },
          {
            "copyright": "David Cortner",
            "date": "2014-08-24",
            "explanation": "What's that dot on the Sun? If you look closely, it is almost perfectly round.  The dot is the result of an unusual type of solar eclipse that occurred in 2006.  Usually it is the Earth's Moon that eclipses the Sun.  This time, the planet Mercury took a turn.  Like the approach to New Moon before a solar eclipse, the phase of Mercury became a continually thinner crescent as the planet progressed toward an alignment with the Sun.  Eventually the phase of Mercury dropped to zero and the dark spot of Mercury crossed our parent star.  The situation could technically be labeled a Mercurian annular eclipse with an extraordinarily large ring of fire.  From above the cratered planes of the night side of Mercury, the Earth appeared in its fullest phase.  Hours later, as Mercury continued in its orbit, a slight crescent phase appeared again.  The next Mercurian solar eclipse will occur in 2016.",
            "hdurl": "https://apod.nasa.gov/apod/image/1408/mercurytransit_cortner_1200.jpg",
            "media_type": "image",
            "service_version": "v1",
            "title": "Mercury's Transit: An Unusual Spot on the Sun",
            "url": "https://apod.nasa.gov/apod/image/1408/mercurytransit_cortner_960.jpg"
          },
        ],
      }
    ]
  }) 
    
  // const [albumFormData, setAlbumFormData] = useState("")
  // if feedView is false, then gridView is active
  const [feedView, setFeedView] = useState(true)
  // if randomMode is false, chronological view is active
  // const [randomMode, setRandomMode] = useState(false)
  // if card grid single is true, show the selected single post
  const [cardGridSingle, setCardGridSingle] = useState({
    selected: false, item: null})

  // if isSearching is true, date picker will appear
  // const [isSearching, setIsSearching] = useState(false)
  const [searchDate, setSearchDate] = useState()
  // const [searchMode, setSearchMode] = useState(false)
  const [lastInteraction, setLastInteraction] = useState("")
  
  const [mode, setMode] = useState({
    latest: true,
    random: false,
    search: false,
    likes: false,
    albums: false,
    isSearching: false,
    isLoading: false,
    isAddingAlbum: false,
  })
   
  // ------------------------------------ APIs -------------------------------------------

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
    
    setMode(prevState => ({
      ...prevState,
      isLoading: true,
    }))
    
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&start_date=${dateStringForApi.startDateString}&end_date=${dateStringForApi.endDateString}`)
    .then(function (response) {
      // handle success
      setItemData(prevData => (
        [
          ...prevData,
          ...response.data.reverse()
        ]
      ))
      setMode(prevState => ({
        ...prevState,
        isLoading: false,
      }))
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
    setMode(prevState => ({
      ...prevState,
      isLoading: true,
    }))
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
      setMode(prevState => ({
        ...prevState,
        isLoading: false,
      }))
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
      // console.log('callApiRandom')
    });
  }

  // --------------------------- HANDLERS ------------------------------------------------
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
    // setRandomMode(true);
    setMode(prevState => ({
      ...prevState,
      latest: false,
      random: true,
      search: false,
      likes: false,
    }))
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
    if (mode.random) {
      // setRandomMode(false);  
      setMode(prevState => ({
        ...prevState,
        latest: true,
        random: false,
        search: false,
        likes: false,
      }))  
      setItemData([]);
      callApiByDate();  
      setDateStringForApi({  
        // reset to initial values  
        startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
        endDateString: dayjs().format("YYYY-MM-DD"),    
        offset: 11,
    })
    }
    if (mode.search || mode.likes) {
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
      // setSearchMode(false);
      setMode(prevState => ({
        ...prevState,
        latest: true,
        random: false,
        search: false,
        likes: false,
      }))
      setItemData([]);
      mode.likes && callApiByDate();
    }    
  }  

  
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
    // setIsSearching(prevState => !prevState)
    setMode(prevState => {
      return(
        {
          ...prevState,
          isSearching: !prevState.isSearching,
        }
      )      
    })
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
    // setRandomMode(false);
    // setSearchMode(true);
    setMode(prevState => ({
      ...prevState,
      latest: false,
      random: false,
      search: true,
      likes: false,
    }))
    setItemData([]);
  }

  // gets the id of last interacted card element so window can scroll to element when switching view
  const handleInteraction = id => {
    // const debounceLastInteraction = debounce(() => setLastInteraction(id), 500);
    // debounceLastInteraction;
    setLastInteraction(id);
  }  

  // render likes
  const handleLikeMode = () => {
    setItemData(likedItemData)
    setMode(prevState => ({
      ...prevState,
      latest: false,
      random: false,
      search: false,
      likes: true,
    }))
  }

  // add new album
  const handleAddAlbumForm = () => {
    setMode(prevState => ({
      ...prevState,
      isAddingAlbum: !prevState.isAddingAlbum,
    }))
  }

  // onChange form listener
  const updateAlbumForm = event => {
    const albumName = event.target.value;
    console.log(albumName);
    
    setAlbumData(prevData => ({
      ...prevData,
      form: albumName
    }));  
  }

  // add new album to album data
  const handleAddNewAlbum = event => {
    event.preventDefault();
    const newAlbum = {
      name: albumData.form,
      data: [],
    };
    const updatedData = albumData.albums.map(d => {return({...d})});
    console.log(updatedData);
    updatedData.push(newAlbum);
    console.log(updatedData);
    setAlbumData(prevData => ({
      ...prevData,
      form: "",
      albums: updatedData
    }))
  }

  // --------------------------- USE EFFECTS --------------------------------------------- 
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
      
      if (mode.likes === false) {
        if (Math.floor(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {
          console.log("infinite scroll v1")     
             
          mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
          console.log(itemData);
          return
        } else if (Math.ceil(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {
          console.log("infinite scroll v2")     
             
          mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
          console.log(itemData);
          return
        } else if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
          console.log("infinite scroll v3")
          
          mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
          console.log(itemData);
          return
        }}  
      }

    const debounceHandleScroll = debounce(handleScroll, 800)

    // window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', debounceHandleScroll);

    return () => {
      // window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', debounceHandleScroll);
    };
  })

  // to scroll window to last interacted element
  useEffect(() => {    
    document.getElementById(lastInteraction)?.scrollIntoView();
    console.log("scroll to: ");
    console.log(lastInteraction);   
  }, [feedView])


  // --------------------------------------- CONSOLE LOG ----------------------------
  // console.log(searchDate)
  console.log("likes: ")
  console.log(likedItemData)
  // console.log(cardGridSingle)
  // console.log(dateStringForApi)
  // console.log(lastInteraction)
  
  const test = "test"

  //  -------------------------------------- DATA FOR CONTEXT ------------------------------
  const checkLikeSingleGrid = checkLikedItems(cardGridSingle.item)
  console.log(checkLikeSingleGrid)

  const data = {
    itemData,
    feedView,
    mode,
    cardGridSingle,
    handleLike,
    checkLikedItems,
    loadGridSingleView,
    unloadGridSingleView,
    checkLikeSingleGrid,
    handleInteraction,
    handleScrollToTop,
    handleDatePicker,
    handleDateSearch,
    searchDate,
    handleRandomView,
    handleLatestView,
    handleFeedView,
    handleGridView,
    handleLikeMode,
    likedItemData,
    albumData,
    handleAddAlbumForm,
    updateAlbumForm,
    handleAddNewAlbum
  }

  
  return (
    <DataContext.Provider value={data}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Container />} />
          <Route path="shuffle" element={<Container />} />
          <Route path="search" element={<Container />} />
          <Route path="likes" element={<Likes />} />
          <Route path="albums" element={<Albums />} />
          <Route path={`${test}`} element={<Likes />} />
                
        </Route>
        
        <Route path="*" element="NOT FOUND" />
      </Routes>
    </BrowserRouter>
    </DataContext.Provider>
  )
}

export default App
