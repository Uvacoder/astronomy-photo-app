import { useContext } from 'react'
import { DataContext } from '../App'

import AlbumDropdown from './AlbumDropdown'

import heartEmpty from "../icons/heart-empty.svg"
import heartSolid from "../icons/heart-solid.svg"
import close from "../icons/x-mark.svg"

export default function CardGridSelection() {
    
    const dataContext = useContext(DataContext)
    const { cardGridSingle, handleLike, 
        unloadGridSingleView,
        checkAlbumData, checkLikedItems
    } = dataContext || {}

    const like = checkLikedItems(cardGridSingle.item);
    const bookmark = checkAlbumData(cardGridSingle.item);

    return (
        <div className="z-50 fixed top-1 w-screen h-screen bg-slate-100/80">
            <h3 className="text-lg">{cardGridSingle.item.title}</h3>
            <button className="btn btn-square btn-ghost" 
                    onClick={unloadGridSingleView}>
                <img className="h-5" src={close} />
            </button>
            <img 
                src={cardGridSingle.item.url} 
                className="max-w-sm block"
                />
            {like ? 
            <button className="btn btn-square btn-ghost" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartSolid} />
            </button> :
            <button className="btn btn-square btn-ghost" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartEmpty} />
            </button> 
            }
            
            <AlbumDropdown bookmark={bookmark} item={cardGridSingle.item} />
     
            <p className="max-w-sm">{cardGridSingle.item.explanation}</p>
            <p className="mb-8">{cardGridSingle.item.date}</p>
        </div>
        
    )
    
}