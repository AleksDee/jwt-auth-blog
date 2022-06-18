import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from 'axios'
import { API_URL } from "../http";


export default class Store {
  user = {} as IUser
  isAuth = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response)
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response.data)
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response)
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response.data)
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (e) {
      console.log(e.response.data)
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }
}