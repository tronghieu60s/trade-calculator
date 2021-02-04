import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { cvNumToCurrency } from "../../helpers/convert";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

type Props = {
  modalVisible: boolean;
  toggleModal: () => void;

  name: string;
  price: string;
  onChangeName: (value: string) => void;
  onChangePrice: (value: string) => void;

  title: string;
  titleButton: string;
  onPressButton: () => void;
};

export default memo(function ProductModal(props: Props) {
  const {
    modalVisible,
    toggleModal,
    name,
    price,
    onChangeName,
    onChangePrice,
    title,
    titleButton,
    onPressButton,
  } = props;

  return (
    <Modal
      title={title}
      modalVisible={modalVisible}
      setModalVisible={toggleModal}
    >
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
          <Text>Giá tiền 1 kg:</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(text) => onChangePrice(cvNumToCurrency(text))}
            value={price}
          />
        </View>
        <View style={styles.bottom}>
          <Button title="Hủy" onPress={toggleModal} />
          <Button
            title={titleButton}
            onPress={onPressButton}
            color="#fff"
            background="#5e72e4"
          />
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
    paddingTop: 20,
  },
});
