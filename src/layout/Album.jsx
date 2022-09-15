import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { DataContext } from "../App"

import Container from "../components/Container"

export default function Album() {

    const dataContext = useContext(DataContext);

    const { albumData, handleAlbumsMode } = dataContext || {};

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
        {/* {totalLikes === 0 ? 
            <div className="mt-16">
                <span className="text-lg">You have no liked items</span>
            </div> :
        <Container/>
        } */}
        <div className="mt-16">
        {
            checkAlbumExists ?
            <>
            <h2>{album.name}</h2>
            <div>
                <Container />
            </div>
            </> :
            <h2>Album Not Found</h2>
        }
        {album.data.length === 0 && <span>No photos added!</span>}
        </div>        
        
        </>
    )
}