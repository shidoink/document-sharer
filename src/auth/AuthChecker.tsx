import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

interface Props {
    children: React.ReactNode;
}

const AuthChecker =({ children }: Props) => {
    const navigate = useNavigate();

    const signInOnClick = async () => {
      const response = await signInWithRedirect(auth, googleProvider);
  }
    
  useEffect(() => {
    const auth_state = onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInOnClick()
        navigate('');
        
      }
    });
    return () => auth_state();
  }, [auth, navigate]);

  return (
    <>{children}</>
  )
}

export default AuthChecker