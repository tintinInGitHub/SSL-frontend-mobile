import { StyleSheet, Platform } from "react-native";
import { BaseColor } from "../../config/theme";

export default StyleSheet.create({
  gridItem: {
    flex: 1,
    backgroundColor: BaseColor.sakuraColor,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
