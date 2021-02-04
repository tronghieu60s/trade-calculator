import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
// @ts-ignore
import DefaultRipple from "react-native-material-ripple";
import { Ripple } from "../Themed";

type Props = {
  title: string;
  color: string;
  background: string;
} & DefaultRipple["props"];;

export default memo(function Button(props: Props) {
  const {
    title,
    color = "#000",
    background: backgroundColor = "#f7fafc",
    ...otherProps
  } = props;
  return (
    <Ripple
      style={[defaultStyles.button, { backgroundColor }]}
      {...otherProps}
    >
      <Text style={[defaultStyles.buttonText, { color }]}>{title}</Text>
    </Ripple>
  );
});

const defaultStyles = StyleSheet.create({
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

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
