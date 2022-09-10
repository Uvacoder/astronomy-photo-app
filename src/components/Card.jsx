import CardPost from './CardPost'
import CardGrid from './CardGrid'

export default function Card({ 
    item, handleLike, like, postView, loadGridSingleView}) {
    
    
    return (
        <>
            { postView ? 
            
            <CardPost 
                item={item}
                handleLike={handleLike}
                like={like}
                />
            :
        
            <CardGrid 
                item={item}
                handleLike={handleLike}
                like={like}
                loadGridSingleView={loadGridSingleView}
            />
            
            }
        </>
        
        
        
    )
    
}