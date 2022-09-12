import LoadingSpinner from "./LoadingSpinner"
import CardGridSelection from "./CardGridSelection"

export default function Container({
    feedView, cards, isLoading, cardGridSingle, 
    handleLike, unloadGridSingleView, checkLikeSingleGrid
}) {
    
    return (
        // <div className="bg-neutral-900 text-slate-50">
        <div className="">
        {feedView ? 
        // post view
        <div className='mt-16 ml-5'>         
          {cards}
          {isLoading && <LoadingSpinner />}
        </div> :
        // grid view
        <div className='grid grid-cols-3 gap-4 justify-center mt-16'>
          {cards}
          {isLoading && <LoadingSpinner />}
        </div>
        }
        {
          cardGridSingle.selected && 
          <CardGridSelection 
            item={cardGridSingle.item} 
            // position={cardGridSingle.position}
            handleLike={handleLike}
            // loadGridSingleView={loadGridSingleView}
            unloadGridSingleView={unloadGridSingleView}
            checkLikeSingleGrid={checkLikeSingleGrid}
            />
        }
        
      </div>
    )
}