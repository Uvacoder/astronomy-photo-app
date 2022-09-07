import { useState } from "react"
import heartEmpty from "../icons/heart-empty.svg"
import heartSolid from "../icons/heart-solid.svg"
import rocket from "../icons/rocket.svg"

export default function Card({ title, url, explanation, date, like, handleLike}) {
    
    const [seeMore, setSeeMore] = useState(false)

    const handleMore = () => setSeeMore(prevState => !prevState)

    return (
        <div>
            <h3 className="text-lg">{title}</h3>
            <img 
                data-src={url} 
                className="max-w-sm block lozad"
                />
            {like ? 
            <button className="btn btn-square btn-ghost invert" onClick={handleLike}>
                <img className="h-5" src={heartSolid} />
            </button> :
            <button className="btn btn-square btn-ghost invert" onClick={handleLike}>
                <img className="h-5" src={heartEmpty} />
            </button> 
            }
            {/* <button className="btn btn-square btn-ghost invert">
                <img className="h-5" src={rocket} />
            </button>             */}

            {seeMore && <p className="max-w-sm">{explanation}</p>}
            {seeMore === false && <p className="max-h-24 max-w-sm line-clamp-3">{explanation}</p>}
            {seeMore === false && <p onClick={handleMore} className="cursor-pointer">..more</p>}
            <p className="mb-8">{date}</p>
        </div>
        
    )
    
}