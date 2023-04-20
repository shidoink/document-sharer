import { useEffect, useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'

const Auth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({ displayName: '', photoURL: '' });

  useEffect(() => {
    if (auth.currentUser) {
      setUserDetails({
        displayName: auth.currentUser.displayName || '',
        photoURL: auth.currentUser.photoURL || '',
      });
      setLoggedIn(true);
    }
  }, [auth.currentUser]);

  const logout = async () => {
    await signOut(auth);
    setLoggedIn(false);
    setUserDetails({ displayName: '', photoURL: '' });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-wrap justify-evenly'>
      {!loggedIn ? (
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      ) : (
        <>
          <div className= 'flex flex-col justify-center'>
            <img
              src={userDetails.photoURL}
              alt="User profile"
              style={{ borderRadius: '50%', width: '40px', height: '40px' }}
            />
          </div>
          <div className='align-middle'>{userDetails.displayName}</div>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Auth;