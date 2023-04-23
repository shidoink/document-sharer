import React from 'react'
import Background from '../assets/background.jpg'

const About = () => {
  return (
    <div style ={{backgroundImage: `url(${Background})`}}
    className=' flex flex-row justify-center mx-auto bg-cover bg-fixed'>
      <div className="flex place-items-center h-screen w-1/2">
        <div className='font-bold text-white'>
          Thank you for visiting my coding temple final project.
          This app utilizes React Vite, Google Firebase, and the MUI Data Grid component. Users securely log in,
          and are allowed to upload files of any type. Files are saved in folders under a unique user ID.
          
        </div>
        
      </div>
    </div>
  )
}

export default About
