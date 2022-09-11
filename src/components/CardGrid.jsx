import { useState } from "react"
import heartEmpty from "../icons/heart-empty.svg"
import heartSolid from "../icons/heart-solid.svg"

export default function CardPost({ item, handleLike, like, loadGridSingleView, handleInteraction }) {
    
    
    return (
        <div className="" id={`${item?.date}`} onMouseOver={() => handleInteraction(item?.date)}>
            
            <img 
                data-src={item?.url} 
                className="rounded-lg object-cover h-80 max-h-80 cursor-pointer lozad"
                onClick={() => loadGridSingleView(item)}
            />
            
        </div>
        
    )
    
}