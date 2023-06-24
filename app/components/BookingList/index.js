import { Pressable, View, Text } from "react-native";
import styles from "./styles";
import Icon from "../../components/Icon/index";
import { BaseColor } from "../../config/theme";
import axios from "axios";

function BookingList({
  refer,
  status,
  name,
  amount,
  id,
  branch,
  color,
  onPress,
}) {
  const onDel = async () => {
    console.log("onref");
    axios
      .post("http://10.0.2.2:1337/api/booking/delBook", { id: id })
      .then((response) => {
        console.log(response.data);
        // setBranch(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // loadBranch();
  };
  return (
    <View style={[styles.gridItem]}>
      {/* <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      > */}

      <View style={[styles.innerContainer, { backgroundColor: color }]}>
        <Icon
          name="times-circle"
          size={20}
          style={styles.del}
          color={BaseColor.sakuraColor}
          onPress={onDel}
          // enableRTL={true}
        />
        <Text style={styles.title}>Reference : {refer}</Text>
        <Text style={styles.title}>Status : {status}</Text>
        {/* <Text style={styles.title}>{list.status}</Text> */}
      </View>
      <View style={[styles.innerContainer, { backgroundColor: color }]}>
        <Text style={styles.title}>Amount : {amount}</Text>
        <Text style={styles.title}>Branch : {branch}</Text>
        {/* <Text style={styles.title}>{list.status}</Text> */}
      </View>
      {/* </Pressable> */}
    </View>
  );
}
export default BookingList;
