import React from 'react'
import { Link} from 'react-router-dom'
import Auth from './Auth'


const Navbar = () => {
  return (
    <>
    <div className='flex justify-evenly'>
      <Link to='/'> Home </Link>
      <Link to ='/About'> About</Link> 
      <Link to ='/Dashboard'> Dashboard</Link>
      <Auth/>
      
      
    </div>
    </>
  )
}

export default Navbar
