import { useContext } from 'react'
import { DataContext } from '../App'

import heartEmpty from "../icons/heart-empty.svg"
import heartSolid from "../icons/heart-solid.svg"
import close from "../icons/x-mark.svg"
import bookmarkEmpty from "../icons/bookmark-empty.svg"
import bookmarkSolid from "../icons/bookmark-solid.svg"

export default function CardGridSelection() {
    
    const dataContext = useContext(DataContext)
    const { cardGridSingle, handleLike, 
        checkLikeSingleGrid, unloadGridSingleView } = dataContext || {}

    return (
        <div className="z-50 fixed top-1 w-screen h-screen bg-slate-800/75 text-slate-50">
            <h3 className="text-lg">{cardGridSingle.item.title}</h3>
            <button className="btn btn-square btn-ghost invert" 
                    onClick={unloadGridSingleView}>
                <img className="h-5" src={close} />
            </button>
            <img 
                src={cardGridSingle.item.url} 
                className="max-w-sm block"
                />
            {checkLikeSingleGrid ? 
            <button className="btn btn-square btn-ghost invert" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartSolid} />
            </button> :
            <button className="btn btn-square btn-ghost invert" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartEmpty} />
            </button> 
            }
            <button className="btn btn-square btn-ghost invert" onClick={() => console.log("bookmarked")}>
                <img className="h-5" src={bookmarkEmpty} />
            </button>
            <button className="btn btn-square btn-ghost invert" onClick={() => console.log("unbookmarked")}>
                <img className="h-5" src={bookmarkSolid} />
            </button>
            
            <p className="max-w-sm">{cardGridSingle.item.explanation}</p>
            <p className="mb-8">{cardGridSingle.item.date}</p>
        </div>
        
    )
    
}