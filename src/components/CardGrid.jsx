
export default function CardGrid(
    { item, loadGridSingleView, handleInteraction }
) {
    
    return (
        <div className="" id={`${item?.date}`} onMouseOver={() => handleInteraction(item?.date)}>
            
            <img 
                data-src={item?.url} 
                className="rounded-lg object-cover h-80 max-h-80 cursor-pointer lozad"
                onClick={() => loadGridSingleView(item)}
            />            
        </div>
        
    )
    
}