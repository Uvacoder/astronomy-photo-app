import caretDown from "../icons/caret-down.svg"
import clock from "../icons/clock.svg"
import shuffle from "../icons/shuffle.svg"
import magGlass from "../icons/mag-glass.svg"
import grid from "../icons/grid.svg"
import image from "../icons/image.svg"
import heartSolid from "../icons/heart-solid.svg"

export default function Navbar({ 
    postView, randomMode, handleMode, handleView, handleScrollToTop }) {
    return (
        <div className="navbar bg-slate-900 text-slate-50 fixed top-0 z-40">
            <div className="flex-1">
                <a 
                    className="btn btn-ghost normal-case text-lg"
                    onClick={handleScrollToTop}
                    >INTERSTELLAR</a>
                <div class="dropdown hover:bg-slate-900/25">
                    <div className="flex items-center">
                        <label tabindex="0" class="btn btn-ghost rounded-btn">   
                        <img class="h-5 ml-4 invert" src={caretDown} />
                        </label>
                    </div>
                    <ul tabindex="0" class="menu dropdown-content p-1 shadow bg-slate-900 text-slate-50 rounded-box w-52 mt-1">
                        <li><a>Latest photos</a></li> 
                        <li><a>Random photos</a></li>
                    </ul>
                </div>
            </div>
            <div className="flex-none">
                { randomMode ?
                <button onClick={handleMode} className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={clock} />
                </button> :
                <button onClick={handleMode} className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={shuffle} />
                </button>
                }                
                
                <button className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={magGlass} />
                </button>

                { postView ?
                <button className="btn btn-square btn-ghost invert" onClick={handleView}>
                    <img className="h-5" src={grid} />
                </button> :
                <button className="btn btn-square btn-ghost invert" onClick={handleView}>
                    <img className="h-5" src={image} />
                </button> }

                <button className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={heartSolid} />
                </button>
            </div>
        </div>
    )
}