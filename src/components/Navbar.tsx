import React from 'react'
import { Link} from 'react-router-dom'
import Auth from './Auth'


const Navbar = () => {
  return (
    <>
    <div className='flex justify-evenly flex-wrap border-rounded p-6'>
      <Link to='/'> <div className=''>Home</div> </Link>
      <Link to ='/About'> About</Link> 
      <Link to ='/Dashboard'> Dashboard</Link>
      <Auth/>
    </div>
    </>
  )
}

export default Navbar
