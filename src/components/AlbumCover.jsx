export default function AlbumCover({
    name, url, length
}) {
    return(
        <div>
            <img className="w-40 h-60 object-cover" src={url} />
            <h2>{name}</h2>
            <p>{`${length} photos`}</p>
        </div>
    )
}