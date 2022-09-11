import { useState } from "react"
import heartEmpty from "../icons/heart-empty.svg"
import heartSolid from "../icons/heart-solid.svg"

export default function CardPost({ item, handleLike, like, handleInteraction }) {
    
    const [seeMore, setSeeMore] = useState(false)

    const handleMore = () => setSeeMore(prevState => !prevState)

    return (
        <div id={`${item?.date}`} onMouseOver={() => handleInteraction(item?.date)}>
            <h3 className="text-lg">{item?.title}</h3>
            <img 
                data-src={item?.url} 
                className="max-w-sm block lozad"
                />
            {like ? 
            <button className="btn btn-square btn-ghost invert" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartSolid} />
            </button> :
            <button className="btn btn-square btn-ghost invert" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartEmpty} />
            </button> 
            }
            
            {seeMore && <p className="max-w-sm">{item?.explanation}</p>}
            {seeMore === false && <p className="max-h-24 max-w-sm line-clamp-3">{item?.explanation}</p>}
            {seeMore === false && <p onClick={handleMore} className="cursor-pointer">..more</p>}
            <p className="mb-8">{item?.date}</p>
        </div>
        
    )
    
}