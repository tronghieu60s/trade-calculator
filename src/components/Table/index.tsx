import React, { memo, ReactNode, useContext, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Product } from "../../../types";
import ProductsContext from "../../contexts/ProductsContext";
import { cvCurrencyToNum, cvNumToCurrency } from "../../helpers/convert";
import {
  deleteProductById,
  getProducts,
  updateProductById,
} from "../../models/ProductsModel";
import ProductItem from "./ProductItem";
import ProductModal from "./ProductModal";

export default memo(function Table() {
  const { products, setProducts } = useContext(ProductsContext);

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);

  const [id, onChangeId] = useState(-1);
  const [name, onChangeName] = useState("");
  const [price, onChangePrice] = useState("");

  const handleDeleteProduct = async (id_product: number) => {
    const response = await deleteProductById(id_product);
    if (response.rowsAffected > 0) {
      ToastAndroid.show("Xóa sản phẩm thành công", ToastAndroid.SHORT);

      const { data } = await getProducts();
      setProducts(data || []);
    }
  };

  const onPressUpdate = (product: Product) => {
    const { id_product, name_product, price_product } = product;
    onChangeId(id_product);
    onChangeName(name_product);
    onChangePrice(cvNumToCurrency(price_product));
    toggleModal();
  };

  const handleUpdateProduct = async () => {
    const product: Product = {
      id_product: id,
      name_product: name,
      price_product: cvCurrencyToNum(price),
    };
    const response = await updateProductById(product);
    if (response.rowsAffected > 0) {
      ToastAndroid.show("Sửa sản phẩm thành công", ToastAndroid.SHORT);
      toggleModal();

      const { data } = await getProducts();
      setProducts(data);
    }
  };

  const renderProductItem = (products: Product[]) => {
    let result: ReactNode = null;
    if (products !== null)
      result = products.map((product, index) => (
        <ProductItem
          index={index}
          key={product.id_product}
          product={product}
          onPressUpdate={onPressUpdate}
          handleDeleteProduct={handleDeleteProduct}
        />
      ));
    return result;
  };

  return (
    <ScrollView>
      <View style={styles.table}>
        <View style={styles.head}>
          <Text style={[styles.text, { flex: 2 }]}>STT</Text>
          <Text style={[styles.text, { flex: 3 }]}>Tên sản phẩm</Text>
          <Text style={[styles.text, { flex: 3 }]}>Giá tiền / Kg</Text>
          <Text style={[styles.text, { flex: 2, borderRightWidth: 0 }]}>
            HĐ
          </Text>
        </View>
        {renderProductItem(products)}
        <ProductModal
          title="Sửa sản phẩm"
          modalVisible={modalVisible}
          toggleModal={toggleModal}
          name={name}
          price={price}
          onChangeName={onChangeName}
          onChangePrice={onChangePrice}
          titleButton="Sửa"
          onPressButton={handleUpdateProduct}
        />
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  table: {
    marginVertical: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  head: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderColor: "#dee2e6",
  },
  text: {
    flex: 5,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 10,
    borderColor: "#dee2e6",
    borderRightWidth: 1,
  },
});
