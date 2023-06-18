import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { useState } from "react";
import styles from "./styles";
import { SelectList } from "react-native-dropdown-select-list";
import CalendarPicker from "react-native-calendar-picker";

function BookingDate({ navigation, route }) {
  const [name, setName] = useState(route?.params?.name);
  const [tel, setTel] = useState(route?.params?.tel);
  const [seat, setSeat] = useState(route?.params?.seat);
  const [date, setDate] = useState(null);
  const minDate = new Date();
  const maxDate = new Date(Date.now() + 3600 * 1000 * 24 * 60);
  let day = new Date("2023-06-19T00:00:00");
  // let day = new Date(2023, 6, 19, 0, 0, 0);
  // let today = moment();
  let customDatesStyles = [];
  // while (day.add(1, "day").isSame(today, "month")) {
  customDatesStyles.push({
    date: day,
    // Random colors
    style: {
      backgroundColor:
        "#" +
        ("#00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
    },
    textStyle: { color: "black" }, // sets the font color
    containerStyle: [], // extra styling for day container
    allowDisabled: true, // allow custom style to apply to disabled dates
  });
  // }
  const onDateChange = (date) => {
    console.log(date);
    console.log(day.toString());
    var dateI = new Date(date);
    setDate(dateI.toDateString());
    navigation.navigate("Booking", {
      date: dateI.toLocaleDateString(),
      tel: tel,
      seat: seat,
      name: name,
    });
  };
  return (
    <View>
      <Text>Date (วันที่)</Text>
      <CalendarPicker
        disabledDates={[day]}
        customDatesStyles={customDatesStyles}
        onDateChange={onDateChange}
        selectedDayColor="#7300e6"
        todayTextStyle={{ fontWeight: "bold" }}
        todayBackgroundColor={"transparent"}
        minDate={minDate}
        maxDate={maxDate}
        textStyle={{
          // fontFamily: "Cochin",
          color: "#000000",
        }}
      />
      <Text>
        {date}
        {maxDate.toDateString}
        {JSON.stringify(route)}
      </Text>
    </View>
  );
}

export default BookingDate;
