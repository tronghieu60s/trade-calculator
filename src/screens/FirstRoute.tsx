import React, { memo, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Product, ProductCal } from "../../types";
import ProductItemCal from "../components/Calculator/CalculatorItem";
import ProductsContext from "../contexts/ProductsContext";
import { cvNumToCurrency } from "../helpers/convert";

export default memo(function FirstRoute() {
  const { products } = useContext(ProductsContext);
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
      (t, { price_product, mass }) => t + price_product * parseFloat(mass || "0"),
      0
    );
    setTotal(total);
  }, [productsCal])

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

  const renderProductItemCal = (products: ProductCal[]) => {
    let result: React.ReactNode = null;
    result = products.map((product) => {
      const { id_product, select, mass } = product;
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
      <Text style={styles.total}>{cvNumToCurrency(total)} VNĐ</Text>
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
    color: '#172b4d',
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
