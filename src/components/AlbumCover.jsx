import { Link } from "react-router-dom"

export default function AlbumCover({
    name, url, length, route, handleAlbumsMode, data
}) {
    return(
        
        <div className="flex flex-col items-start">
            <Link to={`/${route}`}>
            <img 
                className="w-40 h-60 object-cover" 
                src={url} 
                onClick={() => handleAlbumsMode(data)}
            />            
            </Link>            
            <h2>{name}</h2>                     
            <p className="flex m-1">{`${length} photos`}</p>
        </div>
        
    )
}

