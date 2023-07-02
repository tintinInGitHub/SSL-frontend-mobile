import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FlatList } from "react-native";
import { BaseColor } from "../../config/theme";
import Icon from "../../components/Icon/index";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import FoodItem from "../../components/FoodItem";

function OrderHome({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("FoodListByCat", { categoryId: itemData.item.id });
    }
    return (
      <FoodItem
        name={itemData.item.name}
        price={itemData.item.price}
        description={itemData.item.description}
        calories={itemData.item.calories}
        avaiable={itemData.item.avaiable.toString()}
        onPress={pressHandler}
      />
    );
  }

  const [foodType, setFoodType] = useState(null);
  const [food, setFood] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(1);
  const onRefresh = async () => {
    console.log("onref");
    loadFoodType();
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
      <FlatList
        data={food}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 260 }}
      ></FlatList>
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
    </View>
  );
}

export default OrderHome;
