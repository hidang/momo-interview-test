import { StyleSheet } from "react-native";
import colors from "../../../shared/colors";

export const LoginScreenStyles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: colors.background,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  boxInput: {
    width: "100%",
    paddingHorizontal: 25,
  },
  input: {
    fontSize: 18,
    height: 44,
    margin: 12,
    borderRadius: 9,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  boxButtonLogin: {
    width: "100%",

    backgroundColor: colors.blue,
    fontWeight: "bold",

    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
});
