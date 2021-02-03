import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

export default memo(function SecondRoute() {
  return <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />;
});

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
