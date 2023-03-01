import axios from "axios";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { User } from "../interface/User";
import { BaseService } from "./BaseService";

export default class AuthService extends BaseService {
  private user?: User;
  isAuthenticated = (): boolean => !!this.user?.id

  constructor(setMessage: any) {
    super('user/', setMessage)
  }

  getUserInfo(): User | undefined {
    return this.user
  }

  register(user: any) {
    return axios.post(`${this.path}signUp`, { user })
      .then(res => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        return res
      })
      .catch(err => this.setMessage({ type: 'danger', message: err.response.data.err }))

  }

  signIn(object: any): Promise<any> {
    return axios.post(`${this.path}logIn`, object).then(res => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return res
    })
      .catch(err => this.setMessage({ type: 'danger', message: err.response.data.err }))


  }

  signOut() { }
}