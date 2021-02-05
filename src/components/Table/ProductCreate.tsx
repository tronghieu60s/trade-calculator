import React, { memo, useContext, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProductsContext from "../../contexts/ProductsContext";
import { cvCurrencyToNum } from "../../helpers/convert";
import { createProduct, getProducts } from "../../models/ProductsModel";
import ProductModal from "./ProductModal";

export default memo(function ProductCreate() {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);

  const { setProducts } = useContext(ProductsContext);
  const [name, onChangeName] = React.useState("");
  const [price, onChangePrice] = React.useState("");

  const handleAddProduct = async () => {
    if (name.trim().length === 0 || price.trim().length === 0) {
      ToastAndroid.show("Phải nhập những trường bắt buộc", ToastAndroid.SHORT);
      return;
    }

    const name_product = name;
    const price_product = cvCurrencyToNum(price);
    const response = await createProduct({
      id_product: 0,
      name_product,
      price_product,
    });

    if (response.insertId > 0) {
      ToastAndroid.show("Thêm thành công", ToastAndroid.SHORT);
      onChangeName("");
      onChangePrice("");
      toggleModal();

      const { data } = await getProducts();
      setProducts(data);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={{ fontSize: 20, color: "#fff" }}>+</Text>
        </TouchableOpacity>
      </View>
      <ProductModal
        title="Thêm sản phẩm"
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        name={name}
        price={price}
        onChangeName={onChangeName}
        onChangePrice={onChangePrice}
        titleButton="Thêm"
        onPressButton={handleAddProduct}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
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
