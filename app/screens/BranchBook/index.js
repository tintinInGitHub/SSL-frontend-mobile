import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import CategoryGridTile from "../../components/CategoryGridTile";
import { FlatList } from "react-native";
import { BRANCH, CATEGORIES } from "../../data/dummy.js";
import { BaseColor } from "../../config/theme";
import { useEffect, useState } from "react";
import axios from "axios";

function BranchBook({ navigation }) {
  function renderBranchyItem(itemData) {
    function pressHandler() {
      navigation.navigate("Booking", { branch: itemData.item });
    }
    return (
      <CategoryGridTile
        title={itemData.item.open == true ? itemData.item.name : "Coming Soon"}
        color={
          itemData.item.open == true ? itemData.item.color : BaseColor.grayColor
        }
        onPress={itemData.item.open == true ? pressHandler : null}
      />
    );
  }
  const [refreshing, setRefreshing] = useState(false);
  const [branch, setBranch] = useState(null);
  const loadBranch = async () => {
    console.log("loadBranch");
    axios
      .post("http://10.0.2.2:1337/api/branch/allBranch")
      .then((response) => {
        // if (response.data && response.data[0]) {
        //   // setQuote(response.data[0].text);
        // } else {
        //   console.log("No quote found in response");
        // }
        console.log(response.data);
        // setPromo(response.data);
        setBranch(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadBranch();
  }, []);

  const onRefresh = async () => {
    console.log("onref");
    loadBranch();
  };

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
        <View>
          <FlatList
            data={branch}
            keyExtractor={(item) => item.id}
            renderItem={renderBranchyItem}
            numColumns={1}
          ></FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BranchBook;
