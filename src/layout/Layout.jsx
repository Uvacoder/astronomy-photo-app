import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

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
      
        <Outlet />
      
    </>
  );
}

export default Layout;