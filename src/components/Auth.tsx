import React, { useState } from 'react'

import {
    auth,
    googleProvider,
        } from '../config/firebase'

import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
        } from 'firebase/auth'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    console.log(auth?.currentUser?.email)

    const signIn= async()=>{
        try{
        await createUserWithEmailAndPassword(auth, email, password)
        setLoggedIn(true)
        }catch(err){
            console.error(err)
        }
    }
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
            <>
        <input className='border' placeholder='email' type="text" onChange={(e)=> setEmail(e.target.value)} />
        <input className='border' placeholder= 'password' type="password" onChange={(e)=> setPassword(e.target.value)} />
        <button onClick={signIn}>Sign In</button>
    <button onClick= {signInWithGoogle}>Sign In With Google</button>
    </>
    :
    <button onClick={logout}> Logout</button>
        }
    </div>
    
  )
}

export default Auth