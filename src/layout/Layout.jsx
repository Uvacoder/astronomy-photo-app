import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import CardGridSelection from "../components/CardGridSelection";

function Layout({
    handleScrollToTop,
    isSearching,
    handleDatePicker,
    handleDateSearch,
    searchDate,    
    handleRandomView,
    handleLatestView,
    handleFeedView,
    handleGridView,
    }) 
    {
  return (
    <>
      <Navbar 
        handleScrollToTop={handleScrollToTop}
        isSearching={isSearching}
        handleDatePicker={handleDatePicker}
        handleDateSearch={handleDateSearch}
        searchDate={searchDate}
        handleRandomView={handleRandomView}
        handleLatestView={handleLatestView}
        handleFeedView={handleFeedView}
        handleGridView={handleGridView}
        />
      {/* <div className="bg-neutral-900 text-slate-50">
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
        } */}
        <Outlet />
      
    </>
  );
}

export default Layout;