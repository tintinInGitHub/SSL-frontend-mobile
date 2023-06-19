import { View, Text, StyleSheet, Image } from "react-native";
import CategoryGridTile from "../../components/CategoryGridTile";
import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { CATEGORIES, NEWS } from "../../data/dummy.js";
import axios from "axios";

function Home({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("NewsDetail", { news: itemData.item });
    }
    return (
      <CategoryGridTile
        title={itemData.item.title_th}
        // color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    axios
      .post("http://10.0.2.2:1337/api/allpromo")
      .then((response) => {
        // if (response.data && response.data[0]) {
        //   // setQuote(response.data[0].text);
        // } else {
        //   console.log("No quote found in response");
        // }
        console.log(response.data);
        setPromo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Text>News Promotions & more</Text>
      <FlatList
        // data={promo}
        data={NEWS}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={1}
      ></FlatList>
    </View>
  );
}

export default Home;
