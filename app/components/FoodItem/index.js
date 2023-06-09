import { View, Text, Pressable, Image } from "react-native";
import styles from "./styles";

function FoodItem({ title, imageUrl, onPress }) {
  return (
    <View>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View>
          <Image
            style={styles.image}
            source={{ uri: imageUrl, width: 32, height: 32 }}
          />

          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}
export default FoodItem;
