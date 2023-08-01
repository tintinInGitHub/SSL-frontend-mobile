import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FlatList } from "react-native";
import { BaseColor } from "../../config/theme";
import Icon from "../../components/Icon/index";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import FoodItem from "../../components/FoodItem";
import { FAB } from "@rneui/themed";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";

import styles from "./styles";

function OrderHome({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler(item) {
      setCart([...cart, item]);
    }
    return (
      <FoodItem
        name={itemData.item.name}
        price={itemData.item.price}
        description={itemData.item.description}
        calories={itemData.item.calories}
        avaiable={itemData.item.avaiable}
        onPress={() => pressHandler(itemData.item)}
      />
    );
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const [foodType, setFoodType] = useState(null);
  const [cart, setCart] = useState([]);
  const [food, setFood] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const branch = useSelector((state) => state.branchReducer.selectedBranch);
  const user = useSelector((state) => state.userReducer.user);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const clearCart = () => {
    setCart([]);
  };
  const onRefresh = async () => {
    console.log("onref");
    loadFoodType();
    loadFood();
  };
  const sendOrder = async () => {
    // console.log(result);
    var arr = {};
    cart.map((x) => {
      console.log(x);
      if (typeof arr[x.id] == "undefined") arr[x.id] = 0;
      arr[x.id]++;
    });
    // console.log(JSON.stringify(arr));
    const result = Object.keys(arr).map((key) => ({
      food_and_drinks: key,
      quantity: arr[key],
    }));
    await axios
      .post("http://10.0.2.2:1337/api/order/addOrder", {
        user: user,
        branch: branch.id,
        listOrder: result,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    setCart([]);
    toggleModal();
  };

  const loadFoodType = async () => {
    // console.log("loadFoodType");
    axios
      .post("http://10.0.2.2:1337/api/food-type/loadFoodType")
      .then((response) => {
        setFoodType(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadFood = async () => {
    console.log("loadFood");
    axios
      .post("http://10.0.2.2:1337/api/food-and-drink/loadFood", {
        food_type: selectedMenu,
        keyword: keyword,
      })
      .then((response) => {
        console.log(response.data);
        setFood(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    loadFoodType();
    loadFood();
  }, [keyword, selectedMenu]);

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: 8,
          marginVertical: 8,
          paddingHorizontal: 8,
          borderRadius: 8,
          backgroundColor: BaseColor.grayColor,
        }}
      >
        <Icon
          name="search"
          size={20}
          color={BaseColor.darkModeColor}
          enableRTL={true}
          style={{ paddingLeft: 8 }}
        ></Icon>

        <TextInput
          style={{ flex: 1, marginLeft: 8 }}
          placeholder="search food"
          onChangeText={setKeyword}
          value={keyword}
        ></TextInput>

        <TouchableOpacity>
          <Icon
            name="filter"
            size={20}
            color={BaseColor.darkModeColor}
            enableRTL={true}
            style={{ paddingLeft: 8 }}
          ></Icon>
        </TouchableOpacity>
      </View>
    );
  }

  function renderFoodType() {
    return (
      <View>
        <FlatList
          horizontal
          data={foodType}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 10, marginBottom: 10 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                marginLeft: 8,
                marginRight: index == foodType.length - 1 ? 8 : 0,
              }}
              onPress={() => {
                setSelectedMenu(item.id);
                console.log(selectedMenu);
              }}
            >
              <Text
                style={{
                  color:
                    selectedMenu == item.id
                      ? BaseColor.sakuraColor
                      : BaseColor.darkModeColor,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          numColumns={1}
        ></FlatList>
      </View>
    );
    {
      /* <Text>{JSON.stringify(foodType)}</Text> */
    }
  }
  function renderHeader() {
    return (
      <View>
        <Header
          title={""}
          renderLeft={() => {
            return (
              <Icon
                name="arrow-left"
                size={20}
                color={BaseColor.sakuraColor}
                enableRTL={true}
              />
            );
          }}
          renderRight={() => {
            return (
              <Icon
                name="history"
                size={20}
                color={BaseColor.sakuraColor}
                enableRTL={true}
              />
            );
          }}
          onPressRight={() => {
            navigation.navigate("BookHistory");
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
    );
  }

  function renderFoodList() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            color={"black"}
            tintColor={"#FFFFF"}
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          ></RefreshControl>
        }
      >
        <View
          style={
            {
              // backgroundColor: BaseColor.darkModeColor,
              // paddingBottom: 100,
            }
          }
        >
          <FlatList
            data={food}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={1}
            contentContainerStyle={{ paddingBottom: 260 }}
          ></FlatList>
        </View>
      </ScrollView>
    );
  }

  function renderModal() {
    return (
      <View>
        <FAB
          style={{ bottom: 115, left: 150 }}
          icon={{ name: "shopping-basket", color: "white", size: 25 }}
          size="medium"
          onPress={toggleModal}
        >
          <View style={styles.containerCircle}>
            <Text
              style={{
                // position: "absolute",
                color: BaseColor.sakuraColor,
                fontSize: 12,
                // backgroundColor: BaseColor.darkModeColor,
              }}
            >
              {cart.length}
            </Text>
          </View>
        </FAB>
        <Modal
          backdropOpacity={0.9}
          backdropColor={BaseColor.sakuraColor}
          isVisible={isModalVisible}
        >
          <View style={{ flex: 1 }}>
            {/* <Text>{JSON.stringify(cart)}</Text> */}
            <Icon
              name="times"
              size={20}
              color={BaseColor.darkColor}
              enableRTL={true}
              style={{ position: "absolute", right: -4 }}
              onPress={toggleModal}
            ></Icon>
            <Icon
              name="trash"
              size={20}
              color={BaseColor.darkColor}
              enableRTL={true}
              style={{ position: "absolute", left: -4 }}
              onPress={clearCart}
            ></Icon>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              renderItem={renderCategoryItem}
              numColumns={1}
              contentContainerStyle={{ paddingBottom: 260 }}
            ></FlatList>
            <Button title="Order" onPress={sendOrder} />
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: BaseColor.redColor,
        flex: 1,
      }}
    >
      {renderHeader()}
      {renderSearch()}
      {renderFoodType()}
      {renderFoodList()}
      {renderModal()}
    </View>
  );
}

export default OrderHome;
