import { StyleSheet, Platform } from "react-native";
import { BaseColor } from "../config/theme";

export default StyleSheet.create({
  shadow: {
    shadowColor: {
      shadowColor: BaseColor.grayColor,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
