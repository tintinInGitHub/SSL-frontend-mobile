import { Pressable, View, Text, Image, ImageBackground } from "react-native";
import styles from "./styles";
import { BaseColor } from "../../config/theme";

function FoodItem({
  name,
  calories,
  price,
  description,
  onPress,
  avaiable,
  banner,
}) {
  return (
    <View style={[styles.gridItem]}>
      <ImageBackground
        source={{
          // uri: "https://localhost:1337/".concat(banner),
          uri: "http://localhost:1337/uploads/2_1_9c7f565632.png",
          width: 320,
          height: 320,
        }}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={onPress}
        >
          <View
            style={[
              styles.innerContainer,
              { backgroundColor: BaseColor.darkModeColor },
            ]}
          >
            <View>
              {/* <Image
                style={{ width: 50, height: 200, resizeMode: "stretch" }}
                source={{
                  uri: "http://localhost:1337/uploads/2_1_9c7f565632.png",
                }}
              /> */}
            </View>
            <Text style={styles.title}>
              {name}
              {calories}
              {description}
              {price}
              {avaiable}
            </Text>
          </View>
        </Pressable>
      </ImageBackground>
    </View>
  );
}
export default FoodItem;
