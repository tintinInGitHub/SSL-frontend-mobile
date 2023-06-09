import { View, Text, FlatList } from "react-native";
import { MEALS } from "../../data/dummy";
import styles from "./styles";
import FoodItem from "../../components/FoodItem";

function FoodListByCat({ route, navigation }) {
  const catId = route.params.categoryId;
  const displayedMeals = MEALS.filter((mealiItem) => {
    return mealiItem.categoryIds.indexOf(catId);
  });

  function renderFoodItem(itemData) {
    function pressHandler() {
      navigation.navigate("FoodDetail", { categoryId: itemData.item.id });
    }
    return (
      <FoodItem
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        onPress={pressHandler}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Text>FoodDetail {catId}</Text>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderFoodItem}
      ></FlatList>
    </View>
  );
}
export default FoodListByCat;
