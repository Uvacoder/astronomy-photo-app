import caretDown from "../icons/caret-down.svg"
import clock from "../icons/clock.svg"
import shuffle from "../icons/shuffle.svg"
import magGlass from "../icons/mag-glass.svg"
import grid from "../icons/grid.svg"
import image from "../icons/image.svg"
import heartSolid from "../icons/heart-solid.svg"
import { Link } from "react-router-dom"
import Search from "./Search"

export default function Navbar({ 
    postView, randomMode, handleMode, handleView, handleScrollToTop, 
    isSearching, handleDatePicker, handleDateSearch, searchDate }) {
    return (
        <div className="navbar bg-slate-900 text-slate-50 fixed top-0 z-40">
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
                <li><Link to="/">Latest</Link></li>
                <li><Link to="/random">Shuffle</Link></li>
                <li><button onClick={() => console.log("feed")}>Feed</button></li>
                <li><button onClick={() => console.log("grid")}>Grid</button></li>
                <li><Link to="/likes">Likes</Link></li>
                </ul>
            </div>
            {/* <div className="flex-none">
                { randomMode ?
                <button onClick={handleMode} className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={clock} />
                </button> :
                <button onClick={handleMode} className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={shuffle} />
                </button>
                }                
                
                <>
                <button className="btn btn-square btn-ghost invert"
                        onClick={handleDatePicker}>
                    <img className="h-5" src={magGlass} />
                </button>
                { isSearching && <Search 
                    handleDatePicker={handleDatePicker}
                    handleDateSearch={handleDateSearch}
                    searchDate={searchDate}
                    />}
                </>
                
                

                { postView ?
                <button className="btn btn-square btn-ghost invert" onClick={handleView}>
                    <img className="h-5" src={grid} />
                </button> :
                <button className="btn btn-square btn-ghost invert" onClick={handleView}>
                    <img className="h-5" src={image} />
                </button> }
                
                <Link to="/likes">
                <button className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={heartSolid} />
                </button>
                </Link>
            </div> */}
        </div>
    )
}