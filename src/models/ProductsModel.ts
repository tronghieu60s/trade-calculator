import { Product } from "../../types";
import { executeSql } from "../utils/SQLite";

export const getProducts = () => {
  return executeSql(`select * from products`, []);
};

export const createProduct = (product: Product) => {
  const { name_product, price_product } = product;
  return executeSql(
    `insert into products(name_product, price_product) values(?, ?)`,
    [name_product, price_product]
  );
};
