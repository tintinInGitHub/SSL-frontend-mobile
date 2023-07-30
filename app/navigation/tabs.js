import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import FoodDetail from "../screens/FoodDetail";
import OrderHome from "../screens/OrderHome";
import FoodListByCat from "../screens/FoodListByCat";
import NewsDetail from "../screens/NewsDetail";
import styles from "./style";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import BranchBook from "../screens/BranchBook";

import { connect } from "react-redux";
import { setSelectedBranch } from "../stores/branch/branchActions";

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -17,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#e32f45",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

function Tabs({ selectedBranch, setSelectedBranch }) {
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
          height: 75,
          ...styles.shadow,
        },
        headerShown: false,
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
        name="OrderHome"
        component={OrderHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/glass-martini-alt-solid.png")}
              resizeMode="contain"
              style={{
                width: 44,
                height: 44,
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
// export default Tabs;

function mapStateToProps(state) {
  console.log("map", state);
  return {
    setSelectedBranch: state.branchReducer.selectedBranch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedBranch: (selectedBranch) => {
      return dispatch(setSelectedBranch(selectedBranch));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
