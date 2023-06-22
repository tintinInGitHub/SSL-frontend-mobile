import { View, Text, Dimensions, Platform } from "react-native";
import { MEALS } from "../../data/dummy";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import YoutubePlayer from "react-native-youtube-iframe";
import * as Utils from "../../utils";
import Icon from "../../components/Icon/index";
import { BaseColor } from "../../config/theme";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

function NewsDetail({ route, navigation }) {
  const news = route.params.news;
  const renderBanner = () => {
    return (
      <View>
        {/* <Text>Banner</Text> */}
        <YoutubePlayer
          height={Dimensions.get("window").width * 0.5625}
          width={"100%"}
          videoId={Utils.getVideoId(news?.video_banner?.video_url)}
          play={true}
          resumePlayAndroid={false}
          webViewProps={{
            androidLayerType:
              Platform.OS === "android" && Platform.Version <= 22
                ? "hardware"
                : "none",
          }}
        />
      </View>
    );
  };
  const renderContent = () => {
    return (
      <View>
        <Text>
          Content{" "}
          {
            (JSON.stringify(news?.video_banner?.video_url),
            Utils.getVideoId(news?.video_banner?.video_url))
          }
        </Text>
        <Text>{Utils.getVideoId(news?.video_banner?.video_url)}</Text>
      </View>
    );
  };
  const onLike = async (like) => {
    console.log("like", like);
    if (!like) {
      setLiked(!like);
      axios
        .post("http://10.0.2.2:1337/api/promo-like/liked", {
          promo: news.id,
          user: 1111,
        })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLiked(null);
      axios
        .post("http://10.0.2.2:1337/api/promo-like/unliked", {
          promo: news.id,
          user: 1111,
        })
        .then((response) => {
          // if (response.data && response.data[0]) {
          //   // setQuote(response.data[0].text);
          // } else {
          //   console.log("No quote found in response");
          // }
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const [liked, setLiked] = useState(null);
  const renderLike = () => {
    return (
      <TouchableOpacity
        onPress={() => onLike(liked)}
        // onPress={() => {
        //   alert("xxx");
        // }}
        activeOpacity={0.7}
        style={{ paddingLeft: 0 }}
      >
        <View style={styles.iconContain}>
          {liked ? (
            <Icon name={"heart"} size={20} color={BaseColor.sakuraColor}></Icon>
          ) : (
            <Icon name={"heart"} size={20} color={BaseColor.grayColor}></Icon>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  const onRefresh = async () => {
    console.log("onref");
    loadLike();
  };

  const loadLike = async () => {
    console.log("loadLike");
    axios
      .post("http://10.0.2.2:1337/api/promo-like/isLiked", {
        id: news.id,
        user: 1111,
      })
      .then((response) => {
        console.log(response.data.liked);
        setLiked(response.data.liked);
        console.log(liked);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadLike();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
      <View style={styles.container}>
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
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        {/* <View style={{ alignItems: "flex-end", flexDirection: "row" }}> */}
        {renderBanner()}
        {renderLike()}
        {/* </View> */}
        <Text>NewsDetail</Text>
        {renderContent()}
        <Text>{liked}</Text>
      </View>
    </SafeAreaView>
  );
}
export default NewsDetail;
