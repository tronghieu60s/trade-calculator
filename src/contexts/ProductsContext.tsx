import React from "react";
import { Product } from "../../types";

type Context = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

const ProductsContext = React.createContext<Context>({
  products: [],
  setProducts: () => {},
});

export const ProductsProvider = ProductsContext.Provider;
export const ProductsConsumer = ProductsContext.Consumer;
export default ProductsContext;
