import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Product } from "../../../types";

type Props = {
  product: Product;
};

export default memo(function ProductItem(props: Props) {
  const { id_product, name_product, price_product } = props.product;
  
  return (
    <View style={styles.container}>
      <Text style={[styles.item, styles.itemCode]}>{id_product}</Text>
      <Text style={[styles.item, { borderRightWidth: 1 }]}>{name_product}</Text>
      <Text style={styles.item}>
        {price_product.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Đ/Kg
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#dee2e6",
  },
  item: {
    flex: 5,
    textAlign: "center",
    letterSpacing: 0.5,
    paddingVertical: 10,
    borderColor: "#dee2e6",
  },
  itemCode: {
    flex: 3,
    fontWeight: "bold",
    borderRightWidth: 1,
  },
});
