import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { PrimaryButton } from "../shared/Button";
import axios from "axios";
import Toast from "react-native-toast-message";
import { AntDesign, Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("screen");
const inputWidth = width - 80;

export default function ReservationsForm({
  open,
  setOpen,
  navigation,
  category,
}) {
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
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
    setEndTime(endTime);
    hideEndTimePicker();
  };

  const submitReservation = () => {
    const data = {
      table: category._id,
      customerName,
      date,
      startTime,
      endTime,
      price,
      customerContactNumber,
      customerEmail,
    };
    if (
      data.table &&
      data.customerEmail &&
      data.customerContactNumber &&
      data.customerName &&
      data.date &&
      data.startTime &&
      data.endTime &&
      data.price
    ) {
      fetch("https://galaxy-rest-be.herokuapp.com/tableres/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: category._id,
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
          setOpen(false);
          console.log(data);
          Toast.show({
            topOffset: 40,
            visibilityTime: 1500,
            position: "top",
            type: "success",
            text1: "Table Reservation Added Successfully",
          });
        })
        .catch((err) => {
          Toast.show({
            topOffset: 40,
            visibilityTime: 1500,
            position: "top",
            type: "success",
            text1: err,
          });
          console.log("Something went wrong");
          setOpen(false);
        });
    } else {
      setOpen(false);
      Toast.show({
        topOffset: 40,
        visibilityTime: 1500,
        position: "top",
        type: "error",
        text1: "Please fill all the required details",
      });
    }
  };
  return (
    <View style={globalStyles.container}>
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
            <View style={styles.inputContainer}>
              <AntDesign name="user" size={24} color="black" />
              <TextInput
                style={styles.tInput}
                label="Customer Name"
                accessibilityLabel="CustomerName"
                testID="ReservationsForm.name"
                theme={{ colors: { primary: "#08b8e1" } }}
                onChangeText={(text) => setName(text)}
                value={customerName}
                clearButtonMode="always"
              />
            </View>

            <View style={styles.inputContainer}>
              <AntDesign name="mail" size={24} color="black" />
              <TextInput
                style={styles.tInput}
                label="Customer Email Address"
                accessibilityLabel="CustomerEmail"
                testID="ReservationsForm.email"
                theme={{ colors: { primary: "#08b8e1" } }}
                onChangeText={(text) => setcustomerEmail(text)}
                value={customerEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <AntDesign name="phone" size={24} color="black" />
              <TextInput
                style={styles.tInput}
                label="Customer Contact Number"
                accessibilityLabel="CustomerTel"
                testID="ReservationsForm.tel"
                theme={{ colors: { primary: "#08b8e1" } }}
                onChangeText={(text) => setcustomerContactNumber(text)}
                value={customerContactNumber}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity onPress={showDatePicker}>
              <View style={styles.commonCard}>
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
              <View style={styles.commonCard}>
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
              onDateChange={(time1) => setStartTime(time1)}
            />

            <TouchableOpacity onPress={showEndTimePicker}>
              <View style={styles.commonCard}>
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
              onDateChange={(time2) => setEndTime(time2)}
              is24Hour={true}
              date={endTime}
            />

            <View style={styles.inputContainer}>
              <Ionicons name="pricetag-outline" size={24} color="black" />
              <TextInput
                style={styles.tInput}
                label="Price"
                accessibilityLabel="Price"
                testID="ReservationsForm.price"
                theme={{ colors: { primary: "#08b8e1" } }}
                onChangeText={(text) => setPrice(text)}
                value={price}
                keyboardType="numeric"
              />
            </View>

            <PrimaryButton
              testID="reservation.Button"
              title={"SAVE"}
              onPress={submitReservation}
              marginTop="50"
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
    fontSize: 15,
    textAlign: "center",
  },
  tInput: {
    alignSelf: "center",
    fontSize: 14,
    height: 50,
    width: inputWidth,
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 17,
    alignItems: "center",
  },
  commonCard: {
    height: 50,
    borderRadius: 10,
    elevation: 10,
    width: inputWidth + 24,
    backgroundColor: "white",
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
