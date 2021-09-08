import { createContext } from 'react';

export const TokenContext = createContext({
  token: null,
  logar: null,
  logout: null
})


export default TokenContext;