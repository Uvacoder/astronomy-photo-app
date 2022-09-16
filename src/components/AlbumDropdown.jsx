import { useContext } from 'react'
import { DataContext } from '../App'

import bookmarkEmpty from "../icons/bookmark-empty.svg"
import bookmarkSolid from "../icons/bookmark-solid.svg"

export default function AlbumDropdown({ bookmark, item }) {

    const dataContext = useContext(DataContext);

    const { albumData, checkAlbumData } = dataContext || {};

    const albumNames = albumData.albums.map((album, index) => {

        const found = album.data.find(info => info.date === item.date)        

        return (            
            <li key={index}>
                <a onClick={()=>console.log(`add to ${album.name}`)}>
                    {album.name}
                    {
                    found ?
                    <img className='h-4' src={bookmarkSolid} /> :
                    <img className='h-4' src={bookmarkEmpty} />
                    }                    
                </a>
            </li>          
        )
    })

    return(
        <div className="dropdown dropdown-top">
            <label tabIndex={0}>
                {bookmark ?
                    <button className="btn btn-square btn-ghost" onClick={console.log("click1")}>
                        <img className="h-5" src={bookmarkSolid} />
                    </button> :
                    <button className="btn btn-square btn-ghost" onClick={console.log("click1")}>
                        <img className="h-5" src={bookmarkEmpty} />
                    </button>            
                }
            </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
                    {albumNames}    
                </ul>
        </div>
            
        
    )
}