import { StyleSheet, Platform } from "react-native";
import { BaseColor } from "../../config/theme";

export default StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
