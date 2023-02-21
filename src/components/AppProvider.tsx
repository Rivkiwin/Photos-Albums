import { createContext, useState } from 'react';
import AuthService from '../services/AuthService';
const services = {
  authService: new AuthService()
};

 interface IServices {
    services:{ authService?: AuthService}
}
const AppContext = createContext({});
const { Provider } = AppContext;
const AppProvider = ({ children }:any) => {
  return <Provider value={{ services }}>{children}</Provider>;
};
export { AppContext, AppProvider };
export type { IServices };
