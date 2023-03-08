import axios from 'axios';
import { signInWithCustomToken, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { auth } from '../services/config/fireBase';
import { ServiceProvider } from './ServiceProvider';


export function useAuth() {
  return useContext(AuthContext);
}

const AuthContext = createContext<authValeType>({} as any);
type authValeType = {
  currentUser?: User,
  setCurrentUser: any,
  loading: boolean,
  setLoading: any,
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  async function setUser() {
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token || '');
  }

  // useEffect(() => {
  //   if (currentUser) {
  //     history.replace('/Albums/');
  //   }
  //   else {
  //     history.replace('/');
  //   }
  // }, [currentUser])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      const token = localStorage.getItem('token');
      setCurrentUser(user);
      if (user) {
        try {
          await setUser();
        } catch (err) { }
      }
      else {
        if (!!token && !currentUser) {
          try {
            signInWithCustomToken(auth, token)
          } catch (err) { }
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const authVale = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
  }


  return (
    <ServiceProvider>
      {loading && <Spinner animation="border" variant="secondary" style={{
        position: 'absolute',
        top: '50%',
        left: ' 50%',
        zIndex: '100'
      }} />}
      <AuthContext.Provider value={authVale}>
        {children}
      </AuthContext.Provider>
    </ServiceProvider>
  );
}
