import { StyleSheet } from "react-native";
import { BaseColor } from "../../config/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColor.darkModeColor,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
