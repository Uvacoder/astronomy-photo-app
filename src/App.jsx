import { useState, useEffect, createContext } from 'react'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"

import Likes from './layout/Likes'
import Layout from './layout/Layout'
import Container from './components/Container'
import Albums from './layout/Albums'
import Album from './layout/Album'

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
    albums: []
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
    saves: false,
    isSearching: false,
    isLoading: false,
    isAddingAlbum: false,
    isBookmarking: false,
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
  // add or remove saves from likedItemData
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
      saves: false,
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
        saves: false,
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
    if (mode.search || mode.saves) {
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
        saves: false,
      }))
      setItemData([]);
      mode.saves && callApiByDate();
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
      saves: false,
    }))
    setItemData([]);
  }

  // gets the id of last interacted card element so window can scroll to element when switching view
  const handleInteraction = id => {
    // const debounceLastInteraction = debounce(() => setLastInteraction(id), 500);
    // debounceLastInteraction;
    setLastInteraction(id);
  }  

  // render saves
  const handleLikeMode = () => {
    setItemData(likedItemData)
    setMode(prevState => ({
      ...prevState,
      latest: false,
      random: false,
      search: false,
      saves: true,
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
    if (albumData.form !== "") {
      const route = albumData.form.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
      const newAlbum = {
        name: albumData.form,
        route: route,
        data: [],
      };
      const updatedData = albumData.albums.map(d => {return({...d})});
      // console.log(updatedData);
      updatedData.push(newAlbum);
      console.log(updatedData);
      setAlbumData(prevData => ({
        ...prevData,
        form: "",
        albums: updatedData
      }))
    }
    handleAddAlbumForm()
  }

  // check if photo is stored in albums
  const checkAlbumData = item => {
    let bookmark = false;
    const numOfAlbums = albumData.albums.length;
    for (let i=0; i<numOfAlbums; i++) {
      const album = albumData.albums[i].data;
      const albumLength = albumData.albums[i].data.length;
      for (let j=0; j<albumLength; j++) {
        if (album[j]?.date === item?.date) {
          bookmark = true
        }
      }      
    }
    return bookmark;
  }

  // switch mode to albums (shared with likes mode)
  const handleAlbumsMode = album => {
    setItemData(album)
    setMode(prevState => ({
      ...prevState,
      latest: false,
      random: false,
      search: false,
      saves: true,
    }))
    setDateStringForApi({  
      // reset to initial values  
      startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
      endDateString: dayjs().format("YYYY-MM-DD"),    
      offset: 11,
    })
  }

  const handleBookmark = (album, item, found) => {
    
    let changedAlbum = album;
    let changedAlbumData;
    
    // console.log(album)    
    // console.log(album.name)
    // console.log(item)
    // console.log(found)

    // map albumData.albums but remove album to edit
    const unchangedAlbums = albumData.albums.filter(alb => {
      if (alb.name !== album.name) {
        return alb
      }
    });
    console.log(unchangedAlbums);

    if (item.date === found?.date) {
      console.log("remove item");
      
      // map album without item
      changedAlbumData = album.data.filter(i => {
        if (i.date !== item.date) {
          return i
        }
      })
      console.log(changedAlbumData);
      
    } else {
      console.log("add item");
      
      // add item to album
      changedAlbumData = album.data;
      changedAlbumData.unshift(item);
      console.log(changedAlbumData);
      
    }

    changedAlbum.data = changedAlbumData;
    console.log(changedAlbum);
    // unshift album to mapped total albums
    unchangedAlbums.unshift(changedAlbum);
    console.log(unchangedAlbums)
    setAlbumData(prevData => ({
      ...prevData,
      albums: unchangedAlbums,
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
      
      if (mode.saves === false) {
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
  // console.log(itemData)
  // console.log("saves: ")
  // console.log(likedItemData)
  // console.log(cardGridSingle)
  // console.log(dateStringForApi)
  // console.log(lastInteraction)
  
  // const album1 = `${albumData.albums[0].route}` || ""
  // console.log(album1)

  //  -------------------------------------- DATA FOR CONTEXT ------------------------------
  
  const data = {
    itemData,
    feedView,
    mode,
    cardGridSingle,
    handleLike,
    checkLikedItems,
    loadGridSingleView,
    unloadGridSingleView,
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
    handleAddNewAlbum,
    checkAlbumData,
    handleAlbumsMode,
    handleBookmark,
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
          {/* <Route path={`${album1}`} element={<Album />} /> */}
          <Route path="/:albumroute" element={<Album />} />    
        </Route>
        <Route path="*" element="NOT FOUND" />
      </Routes>
    </BrowserRouter>
    </DataContext.Provider>
  )
}

export default App
