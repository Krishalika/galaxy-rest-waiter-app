import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { globalStyles } from "../styles/global";
import COLORS from "../src/consts/colors";

// import moment from "moment";

export default function ReservationsForm() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  //datepicker
  const [startDate, setDate] = useState(new Date());
  const showDatePicker = () => {
    setDatePickerVisibility(true);
    chosenDate: "";
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
  };

  //timePicker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
    chosenDate: "";
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    hideTimePicker();
  };
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{
          Table: "",
          Name: "",
          Date: "",
          Time: "",
          Duration: "",
          Price: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              required
              style={globalStyles.input}
              placeholder="Table Number" //on the values it updates table prop
              onChangeText={props.handleChange("Table")}
              value={props.values.Table}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Customer Name"
              accessibilityLabel="CustomerName"
              onChangeText={props.handleChange("Name")}
              value={props.values.Name}
              testID="ReservationsForm.customerName"

            />
            <TextInput
              style={globalStyles.input}
              placeholder="Date"
              onChangeText={props.handleChange("Date")}
              value={props.values.Date}
              editable={false}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Time"
              onChangeText={props.handleChange("Date")}
              value={props.values.Date}
              editable={false}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Duration"
              onChangeText={props.handleChange("Duration")}
              value={props.values.Duration}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Total Price"
              accessibilityLabel="Price"
              onChangeText={props.handleChange("Price")}
              value={props.values.Price}
              testID="ReservationsForm.price"

            />

            <Button
              title="SAVE"
              color={COLORS.primary}
              onPress={props.handleSubmit}
              testID="ReservationsForm.Button"
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
