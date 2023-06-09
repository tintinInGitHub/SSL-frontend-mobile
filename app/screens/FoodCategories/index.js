import { View, Text, StyleSheet, Image } from "react-native";
import CategoryGridTile from "../../components/CategoryGridTile";
import { FlatList } from "react-native";
import { CATEGORIES } from "../../data/dummy.js";

function FoodCategories({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("FoodListByCat", { categoryId: itemData.item.id });
    }
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <View>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      ></FlatList>
    </View>
  );
}

export default FoodCategories;
