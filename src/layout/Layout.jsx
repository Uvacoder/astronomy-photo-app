import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout({
    postView,
    randomMode,
    handleMode,
    handleView,
    handleScrollToTop,
    isSearching,
    handleDatePicker,
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
      <Outlet />
    </>
  );
}

export default Layout;