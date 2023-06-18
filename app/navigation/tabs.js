import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import FoodDetail from "../screens/FoodDetail";
import FoodCategories from "../screens/FoodCategories";
import FoodListByCat from "../screens/FoodListByCat";
import NewsDetail from "../screens/NewsDetail";
import styles from "./style";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import BranchBook from "../screens/BranchBook";

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#e32f45",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      headerMode="none"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              <Image
                source={require("../../assets/home-solid.png")}
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              ></Image>
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 16 }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="FoodCategories"
        component={FoodCategories}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/glass-martini-alt-solid.png")}
              resizeMode="contain"
              style={{
                width: 36,
                height: 36,
                tintColor: "#fff",
              }}
            ></Image>
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}></CustomTabBarButton>
          ),
        }}
      ></Tab.Screen>
      {/* <Tab.Screen
        name="FoodCategories"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../assets/favicon.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "'e32f45" : "#748c94",
                }}
              ></Image>
              <Text
                style={{ color: focused ? "'e32f45" : "#748c94", fontSize: 12 }}
              >
                Home
              </Text>
            </View>
          ),
        }}
        component={FoodCategories}
      ></Tab.Screen> */}
      <Tab.Screen
        name="BranchBook"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              <Image
                source={require("../../assets/book-open-solid.png")}
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              ></Image>
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 16,
                }}
              >
                Booking
              </Text>
            </View>
          ),
        }}
        component={BranchBook}
      ></Tab.Screen>
      {/* <Tab.Screen name="FoodListByCat" component={FoodListByCat}></Tab.Screen> */}
      {/* <Tab.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={
          {
            //   tabBarStyle: { display: "none" },
          }
        }
      ></Tab.Screen> */}
    </Tab.Navigator>
  );
}
export default Tabs;
