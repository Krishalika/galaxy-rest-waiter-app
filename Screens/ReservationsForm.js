import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { globalStyles } from "../styles/global";
import COLORS from "../src/consts/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from "react-native-material-dropdown-v2-fixed";
// import moment from "moment";
import DatePicker from "react-native-datepicker";

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
              // keyboardType="numberic"
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
            {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
            {/* <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
              date={startDate}
              onDateChange={(date1) => setDate(date1)}
            /> */}
            {/* <DatePicker
              style={{ width: 200 }}
              date={props.values.Date}
              mode="date"
              placeholder="Date"
              format="DD-MM-YYYY"
              minDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              onDateChange={(date3) => setDate(date3)}
            /> */}
            <TextInput
              style={globalStyles.input}
              placeholder="Time"
              onChangeText={props.handleChange("Date")}
              value={props.values.Date}
              editable={false}
            />
            {/* <Button title="Show Time Picker" onPress={showTimePicker} />

            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
              is24Hour={true}
              onDateChange={(time1) => setTime(time1)}
            /> */}

            <TextInput
              style={globalStyles.input}
              placeholder="Duration"
              onChangeText={props.handleChange("Duration")}
              value={props.values.Duration}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Total Price"
              onChangeText={props.handleChange("Price")}
              value={props.values.Price}
            />
            {/* <DateField onSubmit={(value) => console.log(value)} />

            <DateField
              labelDate="Input date"
              labelMonth="Input month"
              labelYear="Input year"
              onSubmit={(value) => console.log(value)}
            /> */}
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
