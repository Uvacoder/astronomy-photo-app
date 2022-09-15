import { Link } from "react-router-dom"

export default function AlbumCover({
    name, url, length, route
}) {
    return(
        <Link to={`/${route}`}>
            <div>
                <img className="w-40 h-60 object-cover" src={url} />
                <h2>{name}</h2>
                <p>{`${length} photos`}</p>
            </div>
        </Link>
    )
}