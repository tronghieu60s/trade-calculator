import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Table from "../components/Table";
import ProductCreate from "../components/Table/ProductCreate";

export default memo(function SecondRoute() {
  return (
    <View style={styles.container}>
      <Table />
      <ProductCreate />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
