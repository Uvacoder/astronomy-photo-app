import caretDown from "../icons/caret-down.svg"
import clock from "../icons/clock.svg"
import shuffle from "../icons/shuffle.svg"
import magGlass from "../icons/mag-glass.svg"
import grid from "../icons/grid.svg"
import image from "../icons/image.svg"
import heartSolid from "../icons/heart-solid.svg"

export default function Navbar({ postView, randomMode, handleMode }) {
    return (
        <div className="navbar bg-slate-900 text-slate-50 fixed top-0">
            <div className="flex-1">
                {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
                <div class="dropdown hover:bg-slate-900/25">
                    <div className="flex items-center">
                        <label tabindex="0" class="btn btn-ghost rounded-btn">Interstellar   
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
                {/* <button className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </button> */}
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
                <button className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={grid} />
                </button> :
                <button className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={image} />
                </button> }

                <button className="btn btn-square btn-ghost invert">
                    <img className="h-5" src={heartSolid} />
                </button>
            </div>
        </div>
    )
}