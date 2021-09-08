import { createContext } from 'react';

export const ProductsContext = createContext({
  products: [],
  setProducts: null
})


export default ProductsContext;