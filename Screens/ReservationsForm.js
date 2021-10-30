import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
//import FlatButton from '../shared/button';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReservationsForm({ open, setOpen, room, navigation }) {
  const [table, setTable] = useState("");
  const [tableNo, setTableNo] = useState("");
  const [customerName, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [customerEmail, setcustomerEmail] = useState("");
  const [price, setPrice] = useState("");
  const [customerContactNumber, setcustomerContactNumber] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [types, setTypes] = React.useState([]);

  const findTableID = async (tableNumber) =>
    await axios
      // .get(`http://10.0.2.2:5000/food/by-name`, {
      .get(`https://galaxy-rest-be.herokuapp.com/table/by-tableNo`, {
        params: { tableNumber: tableNumber },
        //params: { name: name },
      })
      .then(({ data }) => {
        setTypes(data);
      })
      .catch((e) => {
        console.log(e);
      });

  const clearData = () => {
    setTableNo("");
    setName("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setcustomerEmail("");
    setPrice("");
    setcustomerContactNumber("");
  };

  //console.log("hello",findTableID("12")[0]._id);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleStartTimeConfirm = (startTime) => {
    // console.warn("A date has been picked: ", date);
    setStartTime(startTime);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleEndTimeConfirm = (endTime) => {
    // console.warn("A date has been picked: ", date);
    setEndTime(endTime);
    hideEndTimePicker();
  };

  const submitReservation = () => {
    const data = {
      table: types[0]._id,
      customerName,
      date,
      startTime,
      endTime,
      price,
      customerContactNumber,
      customerEmail,
    };
    if (data.customerEmail && data.customerContactNumber && data.customerName) {
      fetch("https://galaxy-rest-be.herokuapp.com/tableres/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: types[0]._id,
          customerName,
          date,
          startTime,
          endTime,
          price,
          customerContactNumber,
          customerEmail,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // setFoodItems((prevFood)=>{
          //   return [data, ...prevFood]
          //  })
          console.log(data);
          console.log("Table Reservation Added Successfully!");
          //clearData();
          // Alert.alert("Table Reservation added");
          setOpen(false);
          //console.log(findTableID(tableNo)._id);
        })
        .catch((err) => {
          console.log("Something went wrong");
          // Alert.alert("Something went wrong");
          // console.log(findTableID(tableNo)._id);
        });
    } else {
      Alert.alert("Please fill all the details");
    }
  };
  return (
    <View style={globalStyles.container}>
      {/* <Text style={globalStyles.blackText}>Room No - {room?.roomNo}</Text> */}
      <Formik
        initialValues={{
          tableNo: "",
          customerName: "",
          date: "",
          startTime: "",
          endTime: "",
          price: "",
          customerContactNumber: "",
          customerEmail: "",
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              label="Customer Name"
              mode="outlined"
              theme={{
                // fonts: {
                //   regular: {
                //     fontFamily: "nunito-bold",
                //   },
                // },
                colors: {
                  primary: "#08b8e1",
                  accent: "#03498f",
                  placeholder: "#03498f",
                  text: "#08b8e1",
                },
              }}
              onChangeText={(text) => setName(text)}
              value={customerName}
              //   testID="ReservForm.name"
            />
            <TextInput
              style={globalStyles.input}
              label="Customer Email Address"
              mode="outlined"
              theme={{
                // fonts: {
                //   regular: {
                //     fontFamily: "nunito-bold",
                //   },
                // },
                colors: {
                  primary: "#08b8e1",
                  accent: "#03498f",
                  placeholder: "#03498f",
                  text: "#08b8e1",
                },
              }}
              onChangeText={(text) => setcustomerEmail(text)}
              value={customerEmail}
              testID="ReservForm.email"
            />
            <TextInput
              style={globalStyles.input}
              label="Customer Contact Number"
              mode="outlined"
              theme={{
                // fonts: {
                //   regular: {
                //     fontFamily: "nunito-bold",
                //   },
                // },
                colors: {
                  primary: "#08b8e1",
                  accent: "#03498f",
                  placeholder: "#03498f",
                  text: "#08b8e1",
                },
              }}
              onChangeText={(text) => setcustomerContactNumber(text)}
              value={customerContactNumber}
              keyboardType="numeric"
              testID="ReservForm.phone"
            />
            {/* <Button title="Show Start Date Picker" onPress={showDatePicker} /> */}
            <TouchableOpacity onPress={showDatePicker}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Select Reservation Date</Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
              date={date}
              onDateChange={(date1) => setDate(date1)}
            />

            <TouchableOpacity onPress={showStartTimePicker}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  Select Reservation Starting Time
                </Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              mode="time"
              onConfirm={handleStartTimeConfirm}
              onCancel={hideStartTimePicker}
              date={startTime}
              is24Hour={true}
              // timePickerModeAndroid={date} ////////////////////
             onDateChange={(time1) => setStartTime(time1)} 
             //onDateChange={(time1) => setStartTime(time1.getHours + ":" + time1.getMinutes)}
            //   date.getHours()
            />

            <TouchableOpacity onPress={showEndTimePicker}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  Select Reservation Ending Time
                </Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleEndTimeConfirm}
              onCancel={hideEndTimePicker}
              // timePickerModeAndroid={date} ////////////////////
             onDateChange={(time2) => setEndTime(time2)}
             is24Hour={true} 
             //onDateChange={(time2) => setStartTime(time2.getHours + ":" + time2.getMinutes)}
              date={endTime}
            />
            <TextInput
              style={globalStyles.input}
              label="Table Number"
              mode="outlined"
              theme={{
                // fonts: {
                //   regular: {
                //     fontFamily: "nunito-bold",
                //   },
                // },
                colors: {
                  primary: "#08b8e1",
                  accent: "#03498f",
                  placeholder: "#03498f",
                  text: "#08b8e1",
                },
              }}
              onChangeText={(text) => setTableNo(text)}
              value={tableNo}
              keyboardType="numeric"
              testID="ReservForm.tableNo"
            />
            <TextInput
              style={globalStyles.input}
              label="Price"
              mode="outlined"
              theme={{
                // fonts: {
                //   regular: {
                //     fontFamily: "nunito-bold",
                //   },
                // },
                colors: {
                  primary: "#08b8e1",
                  accent: "#03498f",
                  placeholder: "#03498f",
                  text: "#08b8e1",
                },
              }}
              onChangeText={(text) => setPrice(text)}
              value={price}
              keyboardType="numeric"
              testID="ReservForm.phone"
            />
            <Button
              testID="reservation.Button"
              title="SAVE"
            //   onPress={(findTableID(tableNo), submitReservation)}
              onPress={(findTableID(tableNo), submitReservation)}

            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 4,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#03498f",
    opacity: 0.8,
  },
  buttonText: {
    color: "#03498f",
    // fontFamily: "nunito-bold",
    // textTransform:'uppercase',
    fontSize: 15,
    textAlign: "center",
  },
});
