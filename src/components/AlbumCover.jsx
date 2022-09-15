import { Link } from "react-router-dom"

export default function AlbumCover({
    name, url, length, route, handleAlbumsMode, data
}) {
    return(
        <Link to={`/${route}`}>
            <div onClick={() => handleAlbumsMode(data)}>
                <img className="w-40 h-60 object-cover" src={url} />
                <h2>{name}</h2>
                <p>{`${length} photos`}</p>
            </div>
        </Link>
    )
}