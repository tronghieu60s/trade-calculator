import { openDatabase } from "expo-sqlite";
import { Alert } from "react-native";
import { ExecuteSQL } from "../../types";

const db = openDatabase("database.db");

export const executeSql = (
  sql: string,
  params: any = []
): Promise<ExecuteSQL> => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, { rows, insertId, rowsAffected }) => {
          const { _array } = rows;
          const data = _array.length === 0 ? null : _array;
          const result: ExecuteSQL = {
            data,
            insertId,
            rowsAffected,
          };
          resolve(result);
        },
        (_, err) => {
          console.log(err);
          Alert.alert(`${err}`);
          return false;
        }
      );
    });
  });
};

export const initDbTable = async () => {
  await executeSql(
    `create table if not exists products (
    id_product integer primary key autoincrement not null, 
    name_product text, 
    price_product integer
    );`
  );
};