# Astronomy Photo App
An Instagram / Pinterest clone that uses NASA's APOD API to browse astronomy photos. This is a front-end single page app that applies CRUD and uses Airtable to store likes and albums.
It is my second project for General Assembly's Software Engineering Immersive Flex program.

## Libraries / API Used

- [React built using ViteJS](https://vitejs.dev/)
- [React router](https://reactrouter.com/en/main)
- [React datepicker](https://www.npmjs.com/package/react-datepicker)
- [React loader spinner](https://www.npmjs.com/package/react-loader-spinner)
- [Axios](https://github.com/axios/axios)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [DayJS](https://day.js.org/)
- [Lodash](https://lodash.com/)
- [Lozad](https://apoorv.pro/lozad.js/)

- [NASA APOD API](https://github.com/nasa/apod-api)

---

## Features

### - Latest or random photos
- View the latest photos (Latest mode)
- View random photos (Shuffle mode)

### - Feed or grid view
While in latest or shuffle mode, you can view the photos either in:
- Feed mode, like Instagram
- Grid mode, like Pinterest

### - Mode switch retains last moused over post
When the user is scrolling through a lot of photos and wishes to switch between feed and grid, the last viewed photo will be lost as the height of the HTML body differs with feed and grid mode.

This is worked around with Javascript and HTML. When there is a mode switch, the last interacted post will appear in the window. ([Code](#last-interacted-post))

<img src="./readme/handle-last-interaction.gif" alt="handle-last-interaction">

### - Infinite scroll
Like all social media apps, this app has infinite scroll and you can keep scrolling down to see more photos. ([Code](#infinite-scroll))

<img src="./readme/infinite-scroll.gif" alt="infinite-scroll">

### - Search by date
APOD releases a new photo everyday, since 1996. You can search a photo by date. Besides searching for that photo, the app will also show the ten previous photos before the search date. Infinite scroll is also enabled in search mode.

<img src="./readme/search.gif" alt="search">

### - Custom likes and albums
You can like a photo or save it to an album. Albums have customized names and can be renamed or deleted. If a photo has already been liked or saved on an album, it cannot be saved again. Likes and albums are stored on Airtable and will be retrieved when the app loads.

### - Responsive design (desktop only) + Light and dark mode compatible

<img src="./readme/responsive.gif" alt="responsive">

The app will display light or dark mode depending on your system preferences. However you cannot toggle between light and dark mode on the app. That means having to set dark mode CSS for every element.

<img src="./readme/light-dark-mode.gif" alt="light-dark-mode">

---

## Deployment

https://astronomy-photo-app.vercel.app/

---

## Wireframe

<img src="./readme/wireframe.jpg" alt="wireframe" width="600">

*Figure 1: Wireframe*

## Component Design

<img src="./readme/component-design.png" alt="component-design">

*Figure 2: Component Hierarchy*

---

## Code

### Infinite scroll

When the browser window is detected to reach the bottom of the document element, an event listener for scrolling will trigger, call the API and push new posts to the document element.

However, there are rounding errors sometimes when calculating `scrollTop`. Then the listener would not trigger the API call. So I added `Math.floor` and `Math.ceil` to round the `scrollTop` calculation.

The next issue is that the API will call multiple times upon reaching the bottom. The `debounce` function from Lodash is used to fix this issue. The app may receive multiple triggers to call the API, but it will wait for 800ms before calling the API once. Once the API is triggered, the state `mode.isLoading` will be true and the API cannot be called again too. 

The API called will depend on the mode state. `mode.random` will `callApiRandom()`. The other modes will `callApiByDate()`.

The event listener is placed in a `useEffect` hook with a cleanup function to `removeEventListener`.

    useEffect(() => {
        const handleScroll = event => {
                
        if (mode.saves === false) {
            if (Math.floor(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {

                mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
                return

            } else if (Math.ceil(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {

            mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
            return

            } else if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {

            mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
            return

            }}  
        };

    const debounceHandleScroll = debounce(handleScroll, 800)

    window.addEventListener('scroll', debounceHandleScroll);

    return () => {
        window.removeEventListener('scroll', debounceHandleScroll);
        };
    })


### Last interacted post

Early versions of this app was not able to keep track of the last interacted posts. I could be viewing a post near the bottom of the body but when I switched from feed to grid view, my window will be at the top of the body. This is disorienting for the user.

To work around this, every post element has its own id, which is the date of the post. Since APOD publishes 1 photo a day, the date is unique (unless the same post appears twice in random mode, which is an edge case). When the mouse goes over a post element, the id of that element is updated to the state `lastInteraction`. 

On switching mode, the app will use `getElementById` to search for the last moused over post element and scroll to it using `scrollIntoView()`.

This code is placed in a `useEffect` hook with the state `feedView` as the dependency array. `feedView` is a boolean which controls whether the app is displaying feed view or grid view.


    // Id is set in the element with a mouseOver listener
    <div 
        id={`${item?.date}`} 
        onMouseOver={() => handleInteraction(item?.date)} 
    >...</div>


    // the date which is the id is lifted from the element to App.jsx
    const handleInteraction = id => {    
        setLastInteraction(id);
    }  


    // useEffect hook will trigger when feedView changes
    useEffect(() => {    
        document.getElementById(lastInteraction)?.scrollIntoView();
    }, [feedView])


### Retrieving from and saving data to Airtable

#### Retrieving

There is a useEffect on app load that calls the Airtable database and retrieves the album and likes data in string format and sets the data into the state `airtableData`. Conditional statements check which data is for albums and for likes.

The functions `updateLikesFromAirtable` and `updateAlbumsFromAirtable` parse the data into JSON format and then update the states containing the likes, `likedItemData` and albums, `albumData`. 

#### Updating

The functions `updateLikesToAirtable` and `updateAlbumsToAirtable` cannot be run on load as the likes and albums states are empty. Then the data on Airtable will be erased. 

Likes are updated whenever the app checks whether a post is liked. Albums are updated when the user adds, renames, deletes an album or adds/removes a photo from album.

---

### References
Infinite scroll using debounce:
https://www.digitalocean.com/community/tutorials/react-react-infinite-scroll

Debounce function:
https://timmousk.com/blog/lodash-debounce/

Fixing the rounding error for infinite scroll:
https://stackoverflow.com/questions/45585542/detecting-when-user-scrolls-to-bottom-of-div-with-react-js

Airtable API error: TypeError: Cannot read property 'offset' of undefined
https://github.com/Airtable/airtable.js/issues/246

Passing functions with useContext:
https://stackoverflow.com/questions/62366824/how-can-%C4%B1-pass-function-with-state-for-react-usecontext



