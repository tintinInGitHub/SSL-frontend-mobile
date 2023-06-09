import { View, Text } from "react-native";
import { MEALS } from "../../data/dummy";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

function NewsDetail({ navigation }) {
  const renderBanner = () => {
    return (
      <View>
        <Text>Banner</Text>
      </View>
    );
  };
  const renderContent = () => {
    return (
      <View>
        <Text>Content</Text>
      </View>
    );
  };
  return (
    // <SafeAreaView forceInset={{ top: "always" }}>
    <View style={styles.container}>
      <Header
        title="hey"
        renderLeft={() => {
          return <Text>Left</Text>;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      ></Header>
      {renderBanner()}
      {renderContent()}
      <Text>NewsDetail</Text>
    </View>
    // </SafeAreaView>
  );
}
export default NewsDetail;
