import { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../App"

import Container from "../components/Container"
import Albums from "./Albums";

import gear from "../icons/gear.svg"

export default function Album() {

    const dataContext = useContext(DataContext);

    const { albumData, updateAlbumData } = dataContext || {};

    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState("")

    let navigate = useNavigate();

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

    

    const handleRename = () => {
        // event.preventDefault();
        setIsRenaming(prevState => !prevState)
        if (newName !== "") {
            const route = newName.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
            const updatedAlbum = {
                name: newName,
                route: route,
                data: album.data,
            };
            console.log(updatedAlbum);
            console.log(albumData);
            let updatedAlbumsAll = albumData;
            updatedAlbumsAll.albums[albumIndex] = updatedAlbum;
            console.log(updatedAlbumsAll);
            () => updateAlbumData(updatedAlbumsAll);
            navigate(`/${route}`);
        }
    }

    const updateRenameForm = event => {
        const form = event.target.value;
        setNewName(form)
    }
    
    console.log(albumData)
    console.log(album)
    console.log(albumIndex)
   
    
    return(
        <>
        
        <div className="mt-16 ml-8">
        {
            checkAlbumExists ?
            <>
            <div className="flex justify-end fixed p-2 w-full bg-white z-40">
                {
                    isRenaming || <h2 className="mx-2 font-semibold">{album.name}</h2>
                }
                {
                    isRenaming && 
                    <form className='flex'>
                        <input 
                            type="text" 
                            onChange={updateRenameForm} value={newName} 
                            placeholder="album name"
                            className="input input-bordered input-xs w-full max-w-xs"
                        />                    
                    </form>
                }
                
                <button className="btn btn-xs mx-2" onClick={handleRename}>Rename</button>
                <button className="btn btn-xs mx-2 mr-12">Delete</button>
            </div>           
                <Container />
            </> :
            // <h2>Album Not Found</h2>  
            <Albums />
                     
   
        }
        {album?.data.length === 0 && <span>No photos added!</span>}
        </div>        
        
        </>
    )
}