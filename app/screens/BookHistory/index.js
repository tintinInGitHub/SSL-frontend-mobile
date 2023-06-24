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
import BookingList from "../../components/BookingList";
import { FlatList } from "react-native";
import { BRANCH, CATEGORIES } from "../../data/dummy.js";
import Icon from "../../components/Icon/index";
import { BaseColor } from "../../config/theme";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

function BookHistory({ navigation }) {
  function renderBranchyItem(itemData) {
    function pressHandler() {
      navigation.navigate("Booking", { branch: itemData.item });
    }
    return (
      <BookingList
        title={
          // itemData.item.open == true
          // ?
          itemData.item.user
          // : itemData.item.name.concat(" : Coming Soon")
        }
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
    // console.log("loadBranch");
    axios
      .post("http://10.0.2.2:1337/api/booking/getBook", { user: 1111 })
      .then((response) => {
        console.log(response.data);
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
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={{ flex: 1, paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            color={"black"}
            tintColor={"#FFFFF"}
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          ></RefreshControl>
        }
      >
        <View style={{ backgroundColor: BaseColor.darkModeColor }}>
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

export default BookHistory;
