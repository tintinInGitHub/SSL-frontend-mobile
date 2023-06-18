import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import styles from "./styles";
import { SelectList } from "react-native-dropdown-select-list";

function Booking({ navigation, route }) {
  const [name, setName] = useState(route?.params?.name);
  const [tel, setTel] = useState(route?.params?.tel);
  const [seat, setSeat] = useState(route?.params?.seat);
  const [date, setDate] = useState(route?.params?.date);
  const minDate = new Date();
  const maxDate = new Date(Date.now() + 3600 * 1000 * 24 * 60);
  const maxSeat = 30;
  var minSeat = 1;
  const data = Array(maxSeat - minSeat + 1)
    .fill()
    .map(() => minSeat++);
  const onDateChange = (date) => {
    console.log(date);
    var dateI = new Date(date);
    setDate(dateI.toDateString());
  };
  const goBookingDate = () => {
    console.log("go");
    navigation.navigate("BookingDate", { tel: tel, seat: seat, name: name });
  };
  const onPressSubmit = () => {
    console.log("go");
    navigation.navigate("Home");
  };
  useEffect(() => {
    setDate(route?.params?.date);
  });
  return (
    <View>
      <Text>Branch (สาขา)</Text>
      {/* <Text>{JSON.stringify(route.params.branch.title)}</Text> */}
      <Text>Name (ชื่อ)</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="useless placeholder"
        keyboardType="default"
      />
      <Text>Mobile Number (เบอร์โทรศัพท์)</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTel}
        value={tel}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Text>Amount (จำนวนคน)</Text>
      <SelectList
        setSelected={(val) => setSeat(val)}
        data={data}
        save="value"
      />
      <Text>Date (วันที่)</Text>
      <TouchableOpacity onPress={goBookingDate}>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          value={date}
          editable={false}
          // placeholder="useless placeholder"
          // keyboardType="numeric"
        />
      </TouchableOpacity>
      <Text>
        {name}
        {tel}
        {seat}
        {date}
        {JSON.stringify(route.params)}
        {maxDate.toDateString}
      </Text>
      <Button
        onPress={onPressSubmit}
        title="Book"
        color="#841584"
        accessibilityLabel="Book button"
      />
    </View>
  );
}

export default Booking;
