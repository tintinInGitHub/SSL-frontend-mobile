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
import { useState } from "react";

function NewsDetail({ route, navigation }) {
  const news = route.params.news;
  const renderBanner = () => {
    return (
      <View>
        {/* <Text>Banner</Text> */}
        <YoutubePlayer
          height={Dimensions.get("window").width * 0.5625}
          width={"100%"}
          videoId={Utils.getVideoId(news.video_banner.video_url)}
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
            (JSON.stringify(news.video_banner.video_url),
            Utils.getVideoId(news.video_banner.video_url))
          }
        </Text>
        <Text>{Utils.getVideoId(news.video_banner.video_url)}</Text>
      </View>
    );
  };
  const onLike = async (like) => {
    console.log("like", like);
    if (!like) {
      setLiked(!like);
    } else {
      setLiked(null);
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
          {!liked ? (
            <Icon name={"heart"} size={20} color={BaseColor.sakuraColor}></Icon>
          ) : (
            <Icon name={"heart"} size={20} color={BaseColor.grayColor}></Icon>
          )}
        </View>
      </TouchableOpacity>
    );
  };
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
