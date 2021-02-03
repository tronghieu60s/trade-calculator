import React, { memo, ReactNode, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Product } from "../../../types";
import { getProducts } from "../../models/ProductsModel";
import ProductItem from "./ProductItem";

export default memo(function Table() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getProducts();
      if(data !== null) setProducts(data);
    })();
  }, []);

  const renderProductItem = (products: Product[]) => {
    let result: ReactNode = null;
    result = products.map((product) => (
      <ProductItem key={product.id_product} product={product} />
    ));
    return result;
  };

  return (
    <ScrollView>
      <View style={styles.table}>
        <View style={styles.head}>
          <Text style={[styles.text, { flex: 3, borderRightWidth: 1 }]}>
            Mã SP
          </Text>
          <Text style={[styles.text, { borderRightWidth: 1 }]}>
            Tên sản phẩm
          </Text>
          <Text style={styles.text}>Giá tiền / Kg</Text>
        </View>
        {renderProductItem(products)}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  table: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  head: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderColor: "#dee2e6",
  },
  text: {
    flex: 5,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 10,
    borderColor: "#dee2e6",
  },
});
