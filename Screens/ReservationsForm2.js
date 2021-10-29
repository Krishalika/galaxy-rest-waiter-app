import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { globalStyles } from "../styles/global";
import COLORS from "../src/consts/colors";

import CustomInput from './CustomInput'


// import moment from "moment";

export default function ReservationsForm2() {
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
          TimeEnd: "",
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
              onChangeText={props.handleChange("Name")}
              value={props.values.Name}
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
              placeholder="Start Time"
              onChangeText={props.handleChange("Date")}
              value={props.values.Date}
              editable={false}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="End Time"
              onChangeText={props.handleChange("TimeEnd")}
              value={props.values.TimeEnd}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Total Price"
              onChangeText={props.handleChange("Price")}
              value={props.values.Price}
            />

            <Button
              title="SAVE"
              color={COLORS.primary}
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
