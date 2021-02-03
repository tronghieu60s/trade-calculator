import React, { memo } from "react";
import {
  Modal as DefaultModal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  children: JSX.Element;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

export default memo(function Modal(props: Props) {
  const { children, modalVisible, setModalVisible } = props;

  return (
    <DefaultModal
      transparent
      animationType="none"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => setModalVisible(false)}
        style={styles.container}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modal}>{children}</View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </DefaultModal>
  );
});

const styles = StyleSheet.create({
  modal: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000ba",
  },
});
