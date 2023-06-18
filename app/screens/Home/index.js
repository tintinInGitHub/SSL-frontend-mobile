import { View, Text, StyleSheet, Image } from "react-native";
import CategoryGridTile from "../../components/CategoryGridTile";
import { FlatList } from "react-native";
import { CATEGORIES, NEWS } from "../../data/dummy.js";

function Home({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("NewsDetail", { news: itemData.item });
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
      <Text>News Promotions & more</Text>
      <FlatList
        data={NEWS}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={1}
      ></FlatList>
    </View>
  );
}

export default Home;
