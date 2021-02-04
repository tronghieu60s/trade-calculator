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

export const deleteProductById = (id_product: number) => {
  return executeSql(`delete from products where id_product = ?`, [id_product]);
};

export const updateProductById = (product: Product) => {
  const { id_product, name_product, price_product } = product;
  return executeSql(
    `update products set name_product = ?, price_product = ? where id_product = ?`,
    [name_product, price_product, id_product]
  );
};
