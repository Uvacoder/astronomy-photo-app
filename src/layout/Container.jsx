import LoadingSpinner from "../components/LoadingSpinner"

export default function Container({
    postView, cards, isLoading, cardGridSingle, 
    handleLike, unloadGridSingleView, like
}) {
    return (
        <div className="bg-neutral-900 text-slate-50">
        {postView ? 
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
            like={like}
            />
        }
        
      </div>
    )
}