import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { useEffect, useState } from "react";
import styles from "./styles";
import { SelectList } from "react-native-dropdown-select-list";
import CalendarPicker from "react-native-calendar-picker";
import axios from "axios";
import { BaseColor } from "../../config/theme";

function BookingDate({ navigation, route }) {
  const [name, setName] = useState(route?.params?.name);
  const [tel, setTel] = useState(route?.params?.tel);
  const [seat, setSeat] = useState(route?.params?.seat);
  const [date, setDate] = useState(null);
  const [holiday, setHoliday] = useState(null);
  const [event, setEvent] = useState(null);
  const [full, setFull] = useState(null);
  const minDate = new Date();
  const maxDate = new Date(Date.now() + 3600 * 1000 * 24 * 60);
  let day = new Date("2023-06-19T00:00:00");
  const [disabledDate, setDisabledDate] = useState([]);

  const [customDatesStyles, setCustomDatesStyles] = useState([]);

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
  const getbackColor = (type) => {
    if (type == "Holiday") {
      return BaseColor.sakuraColor;
    }
    if (type == "Full") {
      return BaseColor.redColor;
    } else {
      return BaseColor.grayColor;
    }
  };

  const loadSpecialDay = async (type) => {
    console.log("loadSpecialDay");
    axios
      .post("http://10.0.2.2:1337/api/special-day/loadSpecialDay", {
        type: type,
      })
      .then((response) => {
        console.log(response.data);
        let cl = getbackColor(type);
        let styleArr = [];
        let disArr = [];
        for (let i = 0; i < response.data?.length; i++) {
          let strDay = response?.data?.[i].date.concat("T00:00:00");
          console.log(strDay);
          let spDay = new Date(strDay);
          disArr.push(spDay);
          styleArr.push({
            date: spDay,
            // Random colors
            style: {
              backgroundColor: cl,
            },
            textStyle: { color: "black" }, // sets the font color
            containerStyle: [], // extra styling for day container
            allowDisabled: true, // allow custom style to apply to disabled dates
          });
        }
        setCustomDatesStyles((customDatesStyles) => [
          ...customDatesStyles,
          ...styleArr,
        ]);
        setDisabledDate((disabledDate) => [...disabledDate, ...disArr]);
        // setCustomDatesStyles(customDatesStyles.concat(styleArr));
        console.log(customDatesStyles);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // setDate(route?.params?.date);
    setHoliday(loadSpecialDay("Holiday"));
    setFull(loadSpecialDay("Full"));
    setEvent(loadSpecialDay("Event"));
  }, []);
  return (
    <View>
      <Text>Date (วันที่)</Text>
      <CalendarPicker
        disabledDates={disabledDate}
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
      <Text style={{ color: BaseColor.sakuraColor }}>
        {/* {date} */}
        {/* {maxDate.toDateString} */}
        {/* {JSON.stringify(route)} */}
        Holiday
      </Text>
      <Text style={{ color: BaseColor.redColor }}>Full</Text>
      <Text style={{ color: BaseColor.grayColorColor }}>Event</Text>
    </View>
  );
}

export default BookingDate;
