import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "./app/screens/Home/index.js";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FoodDetail from "./app/screens/FoodDetail/index.js";
import OrderHome from "./app/screens/OrderHome/index.js";
import FoodListByCat from "./app/screens/FoodListByCat/index.js";
import NewsDetail from "./app/screens/NewsDetail/index.js";
import Tabs from "./app/navigation/tabs.js";
import BranchBook from "./app/screens/BranchBook/index.js";
import Booking from "./app/screens/Booking/index.js";
import BookingDate from "./app/screens/BookingDate/index.js";
import BookHistory from "./app/screens/BookHistory/index.js";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./app/stores/rootReducer";
const Stack = createNativeStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto"></StatusBar>
      <NavigationContainer>
        {/* <Tabs /> */}
        <Stack.Navigator
          initialRouteName="BottomTabNavigator"
          screenOptions={{
            contentStyle: {
              // backgroundColor: "#24180F",
            },
            // headerShown: false,
          }}
        >
          <Stack.Screen
            name="BottomTabNavigator"
            component={Tabs}
          ></Stack.Screen>
          {/* <Stack.Screen name="Home" component={Home}></Stack.Screen> */}
          <Stack.Screen name="OrderHome" component={OrderHome}></Stack.Screen>
          <Stack.Screen name="NewsDetail" component={NewsDetail}></Stack.Screen>
          <Stack.Screen name="FoodDetail" component={FoodDetail}></Stack.Screen>
          <Stack.Screen
            name="FoodListByCat"
            component={FoodListByCat}
          ></Stack.Screen>
          <Stack.Screen name="BranchBook" component={BranchBook}></Stack.Screen>
          <Stack.Screen
            name="BookHistory"
            component={BookHistory}
          ></Stack.Screen>
          <Stack.Screen name="Booking" component={Booking}></Stack.Screen>
          <Stack.Screen
            name="BookingDate"
            component={BookingDate}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  navItem: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  userInfo: {
    alignItems: "center",
    marginTop: 20,
  },
  userPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  userPoints: {
    marginTop: 5,
    fontSize: 16,
  },
  newsPromotionContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
