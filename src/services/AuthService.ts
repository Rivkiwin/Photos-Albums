import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { User } from "../interface/User";
import { BaseService } from "./BaseService";
import { auth } from "./config/fireBase";



export default class AuthService extends BaseService {
  private user?: User;
  isAuthenticated = (): boolean => !!this.user?.id

  constructor(setMessage: any) {
    super('user/', setMessage)
  }

  logout() {
    signOut(auth).catch(error => { this.setMessage({ type: 'danger', message: (error.message).replace('Firebase: ', '') }) });
    localStorage.removeItem('token');
  }

  register(user: any) {
    return createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(res=>{
      this.setMessage({message:'Successfully SignupUp', type:'success'});
      return res;
    })
      .catch(error => { this.setMessage({ type: 'danger', message: (error.message).replace('Firebase: ', '') }) })
  }

  signIn(user: any) {
    return signInWithEmailAndPassword(auth, user.email, user.password)
   .then(res=>{
      this.setMessage({message:'Successfully SignIn', type:'success'});
      return res;
    })
      .catch(error => { this.setMessage({ type: 'danger', message: (error.message).replace('Firebase: ', '') }) });

  }

  listAllUsers = () =>{
    return axios.post(this.path+'getAllUsers')
      .catch(error => { this.setMessage({ type: 'danger', message: (error.message).replace('Firebase: ', '') }) });

  }

}