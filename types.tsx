export type ExecuteSQL = {
  data: any[];
  insertId: number;
  rowsAffected: number;
};

export type Product = {
  id_product: number;
  name_product: string;
  price_product: number;
}

export type ProductCal = Product & {
  select: boolean;
  mass: string;
};