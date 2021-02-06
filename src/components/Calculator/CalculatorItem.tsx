import React, { memo, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { Product, ProductCal } from "../../../types";
import { cutDecimal, cvNumToCurrency } from "../../helpers/convert";

type Props = {
  product: ProductCal;
  input_value: string;
  onInputChange: (id_product: number, value: string) => void;
  switch_value: boolean;
  onSwitchChange: (id_product: number) => void;
};

export default memo(function CalculatorItem(props: Props) {
  const refInput = useRef(null);
  const {
    product,
    input_value,
    onInputChange,
    switch_value,
    onSwitchChange,
  } = props;
  const { id_product, name_product, price_product } = product;

  const color = switch_value ? "#5e72e4" : "#767577";
  const borderColor = switch_value ? "#5e72e4" : "#8898aa";
  return (
    <View style={[styles.container, { borderColor }]}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.switch}>
          <Switch
            value={switch_value}
            onValueChange={() => {
              onSwitchChange(id_product);
              !switch_value && (refInput.current as any).focus();
            }}
            trackColor={{ false: "#a6a5a7", true: "#5e72e480" }}
            thumbColor={switch_value ? "#5e72e4" : "#767577"}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        <View style={styles.text}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.name}>{name_product}</Text>
          </View>
          <Text style={styles.price}>
            {cvNumToCurrency(price_product)} Đ/KG
          </Text>
        </View>
        <View style={styles.input}>
          <TextInput
            ref={refInput}
            placeholder="0"
            keyboardType="number-pad"
            style={styles.mass}
            onChangeText={(text) => onInputChange(id_product, text)}
            value={input_value}
          />
          <Text style={styles.massText}>kí</Text>
        </View>
      </View>
      <View style={styles.total}>
        <Text style={[styles.totalText, { color }]}>
          {cutDecimal(
            cvNumToCurrency(price_product * parseFloat(input_value || "0"))
          )}{" "}
          VNĐ
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  switch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flex: 3,
    justifyContent: "center",
    marginLeft: 20,
  },
  input: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  total: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  totalText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  name: {
    color: "#5e72e4",
    fontSize: 17,
    fontWeight: "bold",
  },
  price: {
    color: "#000",
    letterSpacing: 1,
    fontWeight: "bold",
  },
  mass: {
    width: 70,
    height: 35,
    color: "#8898aa",
    fontSize: 15,
    paddingHorizontal: 10,
    borderColor: "#dee2e6",
    borderWidth: 1,
    borderRadius: 4,
  },
  massText: {
    marginLeft: 5,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
