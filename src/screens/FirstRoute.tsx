import React, { memo, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Product, ProductCal } from "../../types";
import ProductItemCal from "../components/Calculator/CalculatorItem";
import Button from "../components/UI/Button";
import ProductsContext from "../contexts/ProductsContext";
import { cutDecimal, cvNumToCurrency } from "../helpers/convert";

export default memo(function FirstRoute() {
  const { products } = useContext(ProductsContext);
  const [showSelected, setShowSelected] = useState(false);
  const [total, setTotal] = useState(0);
  const [productsCal, setProductsCal] = useState<ProductCal[]>([]);

  useEffect(() => {
    let newProducts: ProductCal[] = products.map((o) => {
      return { select: false, mass: "", ...o };
    });
    setProductsCal(newProducts);
  }, [products]);

  useEffect(() => {
    const selected = productsCal.filter((o) => o.select);
    const total = selected.reduce(
      (t, { price_product, mass }) =>
        t + price_product * parseFloat(mass || "0"),
      0
    );
    setTotal(total);
  }, [productsCal]);

  const onSwitchChange = (id_product: number) => {
    let newProductsCal = productsCal.map((o) => {
      if (o.id_product === id_product) o.select = !o.select;
      return o;
    });
    setProductsCal(newProductsCal);
  };

  const onInputChange = (id_product: number, value: string) => {
    let newProductsCal = productsCal.map((o) => {
      if (o.id_product === id_product) o.mass = value;
      return o;
    });
    setProductsCal(newProductsCal);
  };

  const onResetSelected = () => {
    let newProducts: ProductCal[] = products.map((o) => {
      return { select: false, mass: "", ...o };
    });
    setProductsCal(newProducts);
  };

  const renderProductItemCal = (products: ProductCal[]) => {
    let result: React.ReactNode = null;
    result = products.map((product) => {
      const { id_product, select, mass } = product;
      if (showSelected && !select) return null;
      return (
        <ProductItemCal
          key={id_product}
          input_value={mass}
          onInputChange={onInputChange}
          switch_value={select}
          onSwitchChange={onSwitchChange}
          product={product}
        />
      );
    });
    return result;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Button
          title={showSelected ? "Hiện Tất Cả SP" : "Hiện SP Đã Chọn"}
          color="#fff"
          background={showSelected ? "#2dce89" : "#5e72e4"}
          onPress={() => setShowSelected(!showSelected)}
        />
        <Button
          title="Reset"
          color="#fff"
          background="#f5365c"
          onPress={onResetSelected}
        />
      </View>
      <Text style={styles.total}>{cutDecimal(cvNumToCurrency(total))} VNĐ</Text>
      <ScrollView style={{ marginTop: 20 }}>
        {renderProductItemCal(productsCal)}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  total: {
    color: "#f5365c",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
});
