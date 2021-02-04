import React, { memo } from "react";
import {
  Modal as DefaultModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  children: JSX.Element;
  title: string;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

export default memo(function Modal(props: Props) {
  const { children, title, modalVisible, setModalVisible } = props;

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
          <View style={styles.modal}>
            <Text style={styles.title}>{title}</Text>
            {children}
          </View>
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
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
});
