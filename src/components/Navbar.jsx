import { useContext } from 'react'
import { DataContext } from '../App'
import { Link } from "react-router-dom"
import Calendar from "./Calendar"

import caretDown from "../icons/caret-down.svg"
import clock from "../icons/clock.svg"
import shuffle from "../icons/shuffle.svg"
import magGlass from "../icons/mag-glass.svg"
import grid from "../icons/grid.svg"
import image from "../icons/image.svg"
import heartSolid from "../icons/heart-solid.svg"

export default function Navbar() {
    const dataContext = useContext(DataContext)

    const { 
        handleScrollToTop, isSearching, handleDatePicker, handleDateSearch, searchDate, 
        handleRandomView, handleLatestView, handleFeedView, handleGridView,    
    } = dataContext || {}

    return (
        <div className="navbar bg-slate-50 fixed top-0 z-40">
            <div className="flex-1">
                <Link 
                    to="/"
                    className="btn btn-ghost normal-case text-lg"
                    onClick={handleScrollToTop}>
                        APOD
                </Link>
                {/* <div class="dropdown hover:bg-slate-900/25">
                    <div className="flex items-center">
                        <label tabindex="0" class="btn btn-ghost rounded-btn">   
                        <img class="h-5 ml-4 invert" src={caretDown} />
                        </label>
                    </div>
                    <ul tabindex="0" class="menu dropdown-content p-1 shadow bg-slate-900 text-slate-50 rounded-box w-52 mt-1">
                        <li><a>Latest photos</a></li> 
                        <li><a>Random photos</a></li>
                    </ul>
                </div> */}
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                <li><Link to="/"><button onClick={handleLatestView}>Latest</button></Link></li>
                <li><Link to="/shuffle"><button onClick={handleRandomView}>Shuffle</button></Link></li>
                <li><button onClick={handleFeedView}>Feed</button></li>
                <li><button onClick={handleGridView}>Grid</button></li>
                <li>
                    <Link to="/search">
                        <button onClick={handleDatePicker}>Search</button>
                        {isSearching && <Calendar 
                            handleDateSearch={handleDateSearch}
                            searchDate={searchDate}
                            />
                        }
                    </Link>
                </li>
                <li><Link to="/likes">Likes</Link></li>
                </ul>
            </div>            
        </div>
    )
}