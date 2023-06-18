import { View, Text, StyleSheet, Image } from "react-native";
import CategoryGridTile from "../../components/CategoryGridTile";
import { FlatList } from "react-native";
import { BRANCH, CATEGORIES } from "../../data/dummy.js";
import { BaseColor } from "../../config/theme";

function BranchBook({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("Booking", { branch: itemData.item });
    }
    return (
      <CategoryGridTile
        title={
          itemData.item.status == "open" ? itemData.item.title : "Coming Soon"
        }
        color={
          itemData.item.status == "open"
            ? itemData.item.color
            : BaseColor.grayColor
        }
        onPress={itemData.item.status == "open" ? pressHandler : null}
      />
    );
  }

  return (
    <View>
      <FlatList
        data={BRANCH}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={1}
      ></FlatList>
    </View>
  );
}

export default BranchBook;
