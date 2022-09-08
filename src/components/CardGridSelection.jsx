import { useState } from "react"
import heartEmpty from "../icons/heart-empty.svg"
import heartSolid from "../icons/heart-solid.svg"

export default function CardGridSelection({ item, handleLike, like, handleGridSingleView }) {
    
    return (
        <div className="z-50 absolute top-0 w-screen h-screen bg-slate-100/50">
            <h3 className="text-lg">{item?.title}</h3>
            <img 
                src={item?.url} 
                className="max-w-sm block"
                />
            {like ? 
            <button className="btn btn-square btn-ghost invert" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartSolid} />
            </button> :
            <button className="btn btn-square btn-ghost invert" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartEmpty} />
            </button> 
            }
            
            <p className="max-w-sm">{item?.explanation}</p>
            <p className="mb-8">{item?.date}</p>
        </div>
        
    )
    
}