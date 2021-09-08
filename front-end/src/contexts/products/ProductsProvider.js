import { useState } from 'react';
import ProductsContext from './ProductsContext';

export default function TokenProvider(props) {
  const [products, setProducts] = useState([])

  return (
    <ProductsContext.Provider value={{products, setProducts}}>
      {props.children}
    </ProductsContext.Provider>
  )
}