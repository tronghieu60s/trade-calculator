import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Table from "../components/Table";
import ProductCreate from "../components/Table/ProductCreate";

export default memo(function SecondRoute() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Table />
      </View>
      <View style={styles.bottom}>
        <ProductCreate />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  top: { height: "88%" },
  bottom: {
    height: "12%",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 10,
  },
});
