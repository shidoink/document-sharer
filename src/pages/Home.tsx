import React from 'react'
import Auth from '../components/Auth'
import Background from '../assets/background.jpg'

const Home = () => {
  return (
    <div style ={{backgroundImage: `url(${Background})`}}
    className=' flex flex-row justify-center mx-auto bg-cover bg-fixed'>
      <div className="flex place-items-center h-screen">
        <div className='font-bold text-white'>Its hosting time :)</div>
        
      </div>
    </div>
  )
}

export default Home
