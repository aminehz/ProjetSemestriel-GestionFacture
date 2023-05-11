import NavBar from "./NavBar";
import React from 'react';
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <NavBar />
          </div>
          <div className="col-md-9 mt-5">
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;