import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import {
  View,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  Text,
} from "react-native";
//// import { useDarkMode } from 'react-native-dark-mode';
// import { Text } from "@components";

import styles from "./styles";
import PropTypes from "prop-types";

export default function Header(props) {
  // const forceDark = useSelector((state) => state.application.force_dark);
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
  //const isDarkMode = useDarkMode();
  // const isDarkMode = useColorScheme() === "dark";
  // useEffect(() => {
  //   let option = isDarkMode ? "light-content" : "dark-content";
  //   if (forceDark) {
  //     option = "light-content";
  //   }
  //   if (forceDark == false) {
  //     option = "dark-content";
  //   }
  //   if (barStyle) {
  //     option = barStyle;
  //   }
  //   StatusBar.setBarStyle("light-content", true);
  // }, [forceDark, isDarkMode]);

  return (
    <View style={[styles.contain, style]}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={[styles.contentLeft, styleLeft]}
          onPress={onPressLeft}
        >
          {renderLeft()}
        </TouchableOpacity>
      </View>
      <View style={[styles.contentCenter, styleCenter]}>
        <Text title2 bold style={{ fontSize: 20 }} numberOfLines={1}>
          {title}
        </Text>
        {subTitle != "" && (
          <Text caption2 light>
            {subTitle}
          </Text>
        )}
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={[styles.contentRightSecond, styleRightSecond]}
          onPress={onPressRightSecond}
        >
          {renderRightSecond()}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contentRight, styleRight]}
          onPress={onPressRight}
        >
          {renderRight()}
        </TouchableOpacity>
      </View>
    </View>
  );
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
};

Header.defaultProps = {
  style: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  styleRightSecond: {},
  renderLeft: () => {},
  renderRight: () => {},
  renderRightSecond: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onPressRightSecond: () => {},
  title: "Title",
  subTitle: "",
  barStyle: "",
};
