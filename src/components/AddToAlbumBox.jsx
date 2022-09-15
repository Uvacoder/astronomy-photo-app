import { useContext } from 'react'
import { DataContext } from '../App'

export default function AddToAlbumBox() {

    const dataContext = useContext(DataContext);

    const { albumData, handleAlbumsMode } = dataContext || {};

    const albumNames = albumData.albums.map(album => {
        return (
            <div className="bg-slate-50 z-10">
                <div 
                onClick={()=>console.log(`add to ${album.name}`)}
                className="cursor-pointer" 
                key={album.name}
                >
                    {album.name}
                </div>
            </div>
            
        )
    })

    return(
        <div className="bg-slate-50 z-10">
            Save To:
            {albumNames}
        </div>
    )
}