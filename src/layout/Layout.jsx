import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

function Layout({
    postView,
    randomMode,
    handleMode,
    handleView,
    handleScrollToTop,
    isSearching,
    handleDatePicker,
    cards,
    isLoading,
    cardGridSingle,
    handleLike,
    unloadGridSingleView,
    like
    }) 
    {
  return (
    <>
      <Navbar 
        postView={postView} 
        randomMode={randomMode} 
        handleMode={handleMode}
        handleView={handleView}
        handleScrollToTop={handleScrollToTop}
        isSearching={isSearching}
        handleDatePicker={handleDatePicker}
        />
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
            position={cardGridSingle.position}
            handleLike={handleLike}
            // loadGridSingleView={loadGridSingleView}
            unloadGridSingleView={unloadGridSingleView}
            like={like}
            />
        }
        <Outlet />
      </div>
    </>
  );
}

export default Layout;