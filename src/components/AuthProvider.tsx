import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../interface/User';
import auth from '../services/config/fireBase';
import AlertPop from './Alert';
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
  header: any,
  setErr: any
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState<any>('');
  const [err, setErr]= useState('');

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
  //     console.log(user);
  //     setCurrentUser(user);
  //     if (user) {
  //       try {
  //         const user = auth.currentUser;
  //         const token = user && (await user.getIdToken());

  //         const header = {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         };
  //         setHeader(header)
  //       } catch (err) { }
  //     }
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  const authVale = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    header,
    setErr
  }


  return (
    <ServiceProvider>
      <AuthContext.Provider value={authVale}>
        {children}
      </AuthContext.Provider>
    </ServiceProvider>
  );
}
