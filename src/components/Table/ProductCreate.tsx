import React, { memo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProductCreateModal from "./ProductCreateModal";

export default memo(function ProductCreate() {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <View>
      <View style={styles.absolute}>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={{ fontSize: 20, color: "#fff" }}>+</Text>
        </TouchableOpacity>
      </View>
      <ProductCreateModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5e72e4",
    borderRadius: 70,
  },
});
