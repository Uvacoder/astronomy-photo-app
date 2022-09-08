import CardPost from './CardPost'
import CardGrid from './CardGrid'

export default function Card({ item, handleLike, like, postView, handleGridSingleView }) {
    
    
    return (
        <div>
            { postView ? 
            <div>
                <CardPost 
                    item={item}
                    handleLike={handleLike}
                    like={like}
                    />
            </div> :
            <div>
                <CardGrid 
                    item={item}
                    handleLike={handleLike}
                    like={like}
                    handleGridSingleView={handleGridSingleView}
                />
            </div>
            }
        </div>
        
        
        
    )
    
}