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
import Icon from "../../components/Icon/index";
import { BaseColor } from "../../config/theme";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

function BranchBook({ navigation }) {
  function renderBranchyItem(itemData) {
    function pressHandler() {
      navigation.navigate("Booking", { branch: itemData.item });
    }
    return (
      <CategoryGridTile
        title={
          itemData.item.open == true
            ? itemData.item.name
            : itemData.item.name.concat(" : Coming Soon")
        }
        color={
          itemData.item.open == true ? itemData.item.color : BaseColor.grayColor
        }
        onPress={itemData.item.open == true ? pressHandler : null}
        banner={itemData.item.banner != null ? itemData.item.banner.url : null}
      />
    );
  }
  const [refreshing, setRefreshing] = useState(false);
  const [branch, setBranch] = useState(null);
  const loadBranch = async () => {
    // console.log("loadBranch");
    axios
      .post("http://10.0.2.2:1337/api/branch/allBranch")
      .then((response) => {
        console.log(
          "http://localhost:1337".concat(response.data[0].banner.url)
        );
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
    // console.log("onref");
    loadBranch();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          style={{
            backgroundColor: BaseColor.darkModeColor,
            // paddingBottom: 100,
          }}
        >
          <FlatList
            data={branch}
            keyExtractor={(item) => item.id}
            renderItem={renderBranchyItem}
            numColumns={1}
            contentContainerStyle={{ paddingBottom: 100 }}
          ></FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BranchBook;
