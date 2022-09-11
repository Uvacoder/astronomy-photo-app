import CardPost from './CardPost'
import CardGrid from './CardGrid'

export default function Card({ 
    item, handleLike, like, postView, loadGridSingleView, handleInteraction}) {
    
    
    return (
        <>
            { postView ? 
            
            <CardPost 
                item={item}
                handleLike={handleLike}
                like={like}
                handleInteraction={handleInteraction}
                />
            :
        
            <CardGrid 
                item={item}
                handleLike={handleLike}
                like={like}
                loadGridSingleView={loadGridSingleView}
                handleInteraction={handleInteraction}
            />
            
            }
        </>
        
        
        
    )
    
}