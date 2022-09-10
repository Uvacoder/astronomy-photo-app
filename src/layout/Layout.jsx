import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout({
    postView,
    randomMode,
    handleMode,
    handleView,
    handleScrollToTop
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
        />
      
      <Outlet />
    </>
  );
}

export default Layout;