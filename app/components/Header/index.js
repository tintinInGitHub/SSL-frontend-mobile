import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
function Header(props) {
  const {
    style,
    styleLeft,
    styleCenter,
    styleRight,
    styleRightSecond,
    title,
    subTitle,
    onPressLeft,
    onPressRight,
    onPressRightSecond,
    renderLeft,
    renderRightSecond,
    renderRight,
    barStyle,
  } = props;
  return (
    <View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={[styles.contentLeft, styleLeft]}
          onPress={onPressLeft}
        >
          {/* {renderLeft()} */}
        </TouchableOpacity>
      </View>
      <View style={[styles.contentCenter, styleCenter]}>
        <Text>{title}</Text>
        {subTitle != "" && <Text>{subTitle}</Text>}
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={[styles.contentRightSecond, styleRightSecond]}
          onPress={onPressRightSecond}
        >
          {/* {renderRightSecond()} */}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.contentRight, styleRight]}
          onPress={onPressRight}
        >
          {/* {renderRight()} */}
        </TouchableOpacity>
      </View>
      <Text>{title}</Text>
    </View>
  );
}
export default Header;
