import axios from "axios";
import { confirmPasswordReset, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { User } from "../interface/User";
import { BaseService } from "./BaseService";
import { auth } from "./config/fireBase";



export default class AuthService extends BaseService {
  private user?: User;
  isAuthenticated = (): boolean => !!this.user?.id

  constructor(setMessage?: any) {
    super('user/', setMessage)
  }

  passwordReset = async (email: string) => {
    return await sendPasswordResetEmail(auth, email)
      .then(res => {
        this.setMessage({ message: 'The Email has been sent; Check your Inbox!', type: 'success' });
        return res
      })
      .catch(error => {
        this.setMessage({ type: 'danger', message: (error.code === 'auth/user-not-found') ? 'User not found, try again!' : 'err try again' })
        return error;
      })
  }

  confirmThePasswordReset = async (
    oobCode: string, newPassword: string
  ) => {
    if (!oobCode && !newPassword) return;

    return await confirmPasswordReset(auth, oobCode, newPassword)
  }

  logout() {
    return signOut(auth).catch(error => { this.setMessage({ type: 'danger', message: (error.message).replace('Firebase: ', '') }) });
  }

  register(user: any) {
    return createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(res => {
        this.setMessage({ message: 'Successfully SignupUp', type: 'success' });
        return res;
      })
      .catch(error => { this.setMessage({ type: 'danger', message: (error.message).replace('Firebase: ', '') }) })
  }

  signIn(user: any) {
    return signInWithEmailAndPassword(auth, user.email, user.password)
      .then(res => {
        this.setMessage({ message: 'Successfully SignIn', type: 'success' });
        return res;
      })
      .catch(error => { this.setMessage({ type: 'danger', message: (error.message).replace('Firebase: ', '') }) });

  }

  listAllUsers = () => {
    return axios.post(this.path + 'getAllUsers')
      .catch((error: any) => { this.setMessage({ type: 'danger', message: (error.message).replace('Firebase: ', '') }) });

  }

}