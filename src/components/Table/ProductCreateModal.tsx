import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { createProduct } from "../../models/ProductsModel";
import Modal from "../UI/Modal";

type Props = {
  modalVisible: boolean;
  toggleModal: () => void;
};

export default memo(function ProductCreateModal(props: Props) {
  const { modalVisible, toggleModal } = props;
  const [name, onChangeName] = React.useState("");
  const [price, onChangePrice] = React.useState("");

  const handleOnChangePrice = (value: string) =>
    onChangePrice(
      value
        .toString()
        .replace(/,/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );

  const handleAddProduct = async () => {
    if (name.trim().length === 0 || price.trim().length === 0) {
      ToastAndroid.show("Phải nhập những trường bắt buộc", ToastAndroid.SHORT);
      return;
    }

    const name_product = name;
    const price_product = parseInt(price.replace(/,/g, ""));
    const response = await createProduct({
      id_product: 0,
      name_product,
      price_product,
    });

    if (response.insertId > 0) {
      ToastAndroid.show("Thêm thành công", ToastAndroid.SHORT);
      toggleModal();
    }
  };

  return (
    <Modal modalVisible={modalVisible} setModalVisible={toggleModal}>
      <View>
        <View style={styles.cover}>
          <Text>Tên sản phẩm:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeName(text)}
            value={name}
          />
        </View>
        <View style={styles.cover}>
          <Text>Giá tiền / Kg:</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={handleOnChangePrice}
            value={price}
          />
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#5e72e4" }]}
            onPress={handleAddProduct}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>Thêm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  cover: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  input: {
    width: "60%",
    height: 35,
    color: "#8898aa",
    fontSize: 15,
    paddingHorizontal: 10,
    borderColor: "#dee2e6",
    borderWidth: 1,
    borderRadius: 4,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 30,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    backgroundColor: "#f7fafc",
    marginHorizontal: 5,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
