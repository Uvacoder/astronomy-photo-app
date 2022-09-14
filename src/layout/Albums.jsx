import { useContext } from 'react'
import { DataContext } from '../App'

import AlbumCover from '../components/AlbumCover';

export default function Albums() {

    const dataContext = useContext(DataContext);
    const { albumData } = dataContext || {};
    // console.log(albumData)
    const albumCovers = albumData.map((album, index) => {
        console.log(album.data);
        console.log("-------")
        const name = album.name;
        console.log(name);
        const url = album.data?.[0].url;
        console.log(url);
        const length = album.data.length;   
        console.log(length);
        return(
            <AlbumCover
                name={name} 
                url={url}
                length={length}
                key={index}
            />
        )
    })

    return(
        <>
        <div className="mt-16">
            <button className="btn">New album</button>            
        </div>
        <div className='grid grid-cols-3 gap-4 justify-center mt-16'>
        {albumCovers}
        </div>
        
        </>
    )
}