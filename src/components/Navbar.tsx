import React from 'react'
import { Link} from 'react-router-dom'
import Auth from './Auth'


const Navbar = () => {
  return (
    <>
      <div className="flex justify-evenly flex-wrap bg-gray-900 text-white place-items-center p-6 ">
        <Link to="/" className="hover:text-gray-300">
          File Host
        </Link>
        <Link to="/About" className="hover:text-gray-300 ">
          About
        </Link>
        <Link to="/Dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>
        <Auth />
      </div>
    </>
  );
}

export default Navbar
