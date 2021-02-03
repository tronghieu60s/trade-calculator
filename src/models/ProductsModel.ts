import { executeSql } from "../utils/SQLite";

export const getProducts = () => {
  return executeSql(`select * from products `, []);
};