import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native';

export default memo(function FirstRoute() {
  return <View style={styles.container}></View>;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});