import CardPost from './CardPost'

export default function Card({ item, handleLike, like }) {
    
    
    return (
        <div>
            <CardPost 
                item={item}
                handleLike={handleLike}
                like={like}
                />
        </div>
        
    )
    
}