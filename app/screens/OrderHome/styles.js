import { StyleSheet } from "react-native";
import { BaseColor } from "../../config/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  containerCircle: {
    width: 20,
    position: "absolute",
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: BaseColor.redColor,
    borderColor: "black",
    borderWidth: 1,
    right: 9,
    alignItems: "center",
    alignContent: "center",
    bottom: 5,
  },
});
