import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { DataContext } from "../App"

import Container from "../components/Container"

import gear from "../icons/gear.svg"

export default function Album() {

    const dataContext = useContext(DataContext);

    const { albumData } = dataContext || {};

    let { albumroute } = useParams();
    // console.log(albumroute);
    // console.log(albumData.albums[0].route);
    const numOfAlbums = albumData.albums.length;
    let checkAlbumExists = false;
    let albumIndex;
    let album;
    for (let i=0; i<numOfAlbums; i++) {
        if (albumroute === albumData.albums[i].route) {
            checkAlbumExists = true;
            albumIndex = i;    
            album = albumData.albums[albumIndex];
            
        }
    }

    // useEffect(() => {
    //     handleAlbumsMode(album?.data)
    // }, [])
    
    // console.log(album)
    return(
        <>
        
        <div className="mt-16">
        {
            checkAlbumExists ?
            <>
            <div className="flex flex-col items-start">
                <h2>{album.name}</h2>
                <button className="btn">Edit album</button>
            </div>           
                <Container />
            </> :
            <h2>Album Not Found</h2>
        }
        {album?.data.length === 0 && <span>No photos added!</span>}
        </div>        
        
        </>
    )
}