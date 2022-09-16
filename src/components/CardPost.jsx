import { useState } from "react"
import heartEmpty from "../icons/heart-empty.svg"
import heartSolid from "../icons/heart-solid.svg"
import bookmarkEmpty from "../icons/bookmark-empty.svg"
import bookmarkSolid from "../icons/bookmark-solid.svg"
import AlbumDropdown from "./AlbumDropdown"

export default function CardPost({ 
    item, handleLike, like, handleInteraction, 
    bookmark }) {
    
    const [seeMore, setSeeMore] = useState(false)
    const [seeAlbum, setSeeAlbum] = useState(false)

    const handleMore = () => setSeeMore(prevState => !prevState)
    const handleBookmark = () => setSeeAlbum(prevState => !prevState)

    return (
        <div id={`${item?.date}`} onMouseOver={() => handleInteraction(item?.date)} className="z-0 relative">
            <h3 className="text-lg">{item?.title}</h3>
            <img 
                data-src={item?.url} 
                className="max-w-sm block lozad"
                />
            {like ? 
            <button className="btn btn-square btn-ghost" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartSolid} />
            </button> :
            <button className="btn btn-square btn-ghost" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartEmpty} />
            </button> 
            }            
            {/* {bookmark ?
            <button className="btn btn-square btn-ghost" onClick={handleBookmark}>
            <img className="h-5" src={bookmarkSolid} />
            </button> :
            <button className="btn btn-square btn-ghost" onClick={handleBookmark}>
            <img className="h-5" src={bookmarkEmpty} />
            </button>            
            } */}
            {/* {seeAlbum ?
            <span className="absolute"><AlbumDropbox /></span> :
            <span className="absolute"></span>
            } */}
            <AlbumDropdown bookmark={bookmark} item={item} />
                        
            {seeMore && <p className="max-w-sm">{item?.explanation}</p>}
            {seeMore === false && <p className="max-h-24 max-w-sm line-clamp-3">{item?.explanation}</p>}
            {seeMore === false && <p onClick={handleMore} className="cursor-pointer">..more</p>}
            <p className="mb-8">{item?.date}</p>
        </div>
        
    )
    
}