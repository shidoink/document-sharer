import { useState } from 'react'

import {
    auth,
    googleProvider,
        } from '../config/firebase'

import {
    signInWithPopup,
    signOut,
        } from 'firebase/auth'

const Auth = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    console.log(auth?.currentUser?.email)

    
    const logout= async()=>{
        await signOut(auth)
        setLoggedIn(false)
        location.reload()
    }

    const signInWithGoogle= async()=>{
        try{
            await signInWithPopup(auth, googleProvider.google)
            setLoggedIn(true)
            
        }catch(err){
            console.error(err)
        }
    }

  return (
   
    <div className= 'flex flex-wrap justify-evenly'>
        {
        !auth.currentUser?
            <button onClick= {signInWithGoogle}>Sign In With Google</button>
                :
            <button onClick={logout}> Logout</button>
        }
    </div>
    
  )
}

export default Auth