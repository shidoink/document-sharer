import { useEffect, useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const Auth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({ displayName: '', photoURL: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetails({
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
        });
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setUserDetails({ displayName: '', photoURL: '' });
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center bg-gray-900 p-4 text-white">
      {!loggedIn ? (
        <button
          onClick={signInWithGoogle}
          className="bg-gray-800 py-2 px-4 rounded-md text-white font-semibold hover:bg-gray-700"
        >
          Sign In With Google
        </button>
      ) : (
        <>
          <div className="flex flex-col justify-center mr-3">
            <img
              src={userDetails.photoURL}
              alt="User profile"
              className="rounded-full w-10 h-10 object-cover"
            />
          </div>
          <div className="align-middle mr-3">{userDetails.displayName}</div>
          <button
            onClick={logout}
            className="bg-gray-800 py-2 px-4 rounded-md text-white font-semibold hover:bg-gray-700"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;