import React from 'react'
import { Link} from 'react-router-dom'
import Auth from './Auth'
import SignInModal from './SignInModal'


const Navbar = () => {
  return (
    <>
    <div className='flex justify-evenly'>
      <Link to='/'> Home </Link>
      <Link to ='/About'> About</Link> 
      <Link to ='/Dashboard'> Dashboard</Link>
      <Link to ='/Profile'> Profile</Link>
      <Auth/>
      <SignInModal/>

      
    </div>
    </>
  )
}

export default Navbar
