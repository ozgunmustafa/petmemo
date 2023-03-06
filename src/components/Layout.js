import React from 'react';
import { Link } from 'react-router-dom';
import { BiStore } from 'react-icons/bi';
import { TbDeviceAnalytics } from 'react-icons/tb';
const Layout = ({ children }) => {
  return (
    <>
      <header className="main-header">
        <div className="container">
          <ul className="main-nav">
            <li className="mr-30">
              <Link to="/" className="d-block">
                <img
                  src={`${process.env.PUBLIC_URL + '/img/logo.svg'}`}
                  width="110"
                  className=""
                  alt=""
                />
              </Link>
            </li>
            <li>
              <Link to="/store">
                <BiStore size="1.3rem" />
                Store
              </Link>
            </li>
            <li>
              <Link to="/analysis">
                <TbDeviceAnalytics size="1.3rem" />
                Analysis
              </Link>
            </li>
            <li className="ml-auto">
              <Link
                to="/login"
                className="btn btn-primary rounded-pill text-white"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <main>{children}</main>
      <footer className='py-15'>
        <div className="text-center">Copyright</div>
      </footer>
    </>
  );
};

export default Layout;
