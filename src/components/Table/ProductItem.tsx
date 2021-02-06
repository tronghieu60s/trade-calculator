import { Feather } from "@expo/vector-icons";
import React, { memo } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Product } from "../../../types";
import { cvNumToCurrency } from "../../helpers/convert";
import { Ripple } from "../Themed";

type Props = {
  index: number;
  product: Product;
  onPressUpdate: (product: Product) => void;
  handleDeleteProduct: (id_product: number) => void;
};

export default memo(function ProductItem(props: Props) {
  const { index, product, onPressUpdate, handleDeleteProduct } = props;
  const { id_product, name_product, price_product } = product;

  const onPressDelete = () => {
    Alert.alert(
      "Xóa",
      "Bạn có muốn xóa sản phẩm này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        { text: "Xóa", onPress: () => handleDeleteProduct(id_product) },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.item, styles.itemCode]}>{index + 1}</Text>
      <View style={[styles.item, { flex: 3 }]}>
        <Text style={styles.itemName}>{name_product}</Text>
      </View>
      <Text style={[styles.item, { flex: 3 }]}>
        {cvNumToCurrency(price_product)}
      </Text>
      <Text style={[styles.item, { flex: 2, borderRightWidth: 0 }]}>
        <Ripple style={{ padding: 5 }} onPress={() => onPressUpdate(product)}>
          <Feather name="edit" size={17} color="black" />
        </Ripple>
        <Ripple style={{ padding: 5 }} onPress={onPressDelete}>
          <Feather name="trash" size={17} color="black" />
        </Ripple>
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    borderRightWidth: 1,
  },
  itemName: {
    textAlign: "left",
    color: "#f5365c",
    fontWeight: "bold",
    marginLeft: 10,
  },
  itemCode: {
    flex: 2,
    fontWeight: "bold",
  },
});
