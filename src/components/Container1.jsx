import LoadingSpinner from "./LoadingSpinner"
import CardGridSelection from "./CardGridSelection"

export default function Container({
    containerData
}) {
    
    return (
        // <div className="bg-neutral-900 text-slate-50">
        <div className="">
        {containerData?.feedView ? 
        // post view
        <div className='mt-16 ml-5'>         
          {containerData.cards}
          {containerData.isLoading && <LoadingSpinner />}
        </div> :
        // grid view
        <div className='grid grid-cols-3 gap-4 justify-center mt-16'>
          {containerData.cards}
          {containerData.isLoading && <LoadingSpinner />}
        </div>
        }
        {
          containerData.cardGridSingle.selected && 
          <CardGridSelection 
            item={containerData.cardGridSingle.item} 
            // position={cardGridSingle.position}
            handleLike={containerData.handleLike}
            // loadGridSingleView={loadGridSingleView}
            unloadGridSingleView={containerData.unloadGridSingleView}
            checkLikeSingleGrid={containerData.checkLikeSingleGrid}
            />
        }
        
      </div>
    )
}