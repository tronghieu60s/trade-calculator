import React from "react";
// @ts-ignore
import DefaultRipple from "react-native-material-ripple";

export type RippleProps = DefaultRipple["props"];

export function Ripple(props: RippleProps): JSX.Element {
  return (
    <DefaultRipple
      rippleCentered
      rippleContainerBorderRadius={50}
      {...props}
    />
  );
}