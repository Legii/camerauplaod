import { StyleSheet } from "react-native";
export const main_color = '#ed2655'
export const main_color_transparent = "#ed2655aa"
export const dark = "#110022"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main_color,
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
  },
  mainColor: {
    backgroundColor: main_color,
    color: "white"
  },
  dark: {
    backgroundColor: dark
  },

  text: {
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold"
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",


  },
  button: {
    backgroundColor: main_color_transparent,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    padding: 10
  },
  buttonTextSmall: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    padding: 10
  },
  small: {
    width: 60,
    height: 60
  },
  big: {
    width: 100,
    height: 100
  }

});

export default styles;
