import { useContext } from 'react'
import { DataContext } from '../App'

import LoadingSpinner from "./LoadingSpinner"
import CardGridSelection from "./CardGridSelection"
import Card from "./Card"

export default function Container() {

  const dataContext = useContext(DataContext)

  // destructure dataContext
  const { itemData, feedView, mode,
    cardGridSingle, handleLike, checkLikedItems,
    loadGridSingleView, handleInteraction } = dataContext || {};

  // map cards
  const cards = itemData.map((item, index) => {
    if (item.media_type === "image") {
      
      const like = checkLikedItems(item)

      return (
        <Card
          item={item}
          like={like}
          handleLike={handleLike}
          feedView={feedView}
          loadGridSingleView={loadGridSingleView}
          handleInteraction={handleInteraction}
          key={index}
        />
      )
    }
  })
    
    return (
        // <div className="bg-neutral-900 text-slate-50">
        <div className="">
          {feedView ? 
          // feed view
          <div className='mt-16 ml-5'>         
            {cards}
            {mode.isLoading && <LoadingSpinner />}
          </div> :
          // grid view
          <div className='grid grid-cols-3 gap-4 justify-center mt-16'>
            {cards}
            {mode.isLoading && <LoadingSpinner />}
          </div>
          }
          
          {
            cardGridSingle.selected && 
            <CardGridSelection />
          }
        
        </div>
    )
}