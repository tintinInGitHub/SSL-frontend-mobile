import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import CategoryGridTile from "../../components/CategoryGridTile";
import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { CATEGORIES, NEWS } from "../../data/dummy.js";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

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
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    console.log("onref");
    loadPromo();
  };

  const loadPromo = async () => {
    console.log("loadPromo");
    axios
      .post("http://10.0.2.2:1337/api/promo/allPromo")
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
  };

  useEffect(() => {
    loadPromo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <Text>News Promotions & more</Text>
        <View style={{ flex: 1 }}>
          <FlatList
            nestedScrollEnabled={true}
            data={promo}
            // data={NEWS}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={1}
            // horizontal={true}
          ></FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
