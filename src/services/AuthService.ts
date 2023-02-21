import { UserInfo } from "os";
import { User } from "../interface/User";

export default class AuthService {
  private user?: User;
  isAuthenticated = (): boolean => !!this.user?.id

  getUserInfo(): User | undefined {
    return this.user
  }

  async signIn(user: { password: string, name: string }) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    for (let i = 0; i < users.length; ++i) {
      if (users[i].address.geo.lat.slice(-4) === user.password && users[i].username === user.name) {
        localStorage.setItem("currentUser", JSON.stringify(users[i]));
        this.user = users[i];
        return users[i];
      }
    }
    alert("Unauthorized user");
  }

  signOut() { }
}