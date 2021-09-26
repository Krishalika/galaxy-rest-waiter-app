import React from "react";
import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { globalStyles } from "../styles/global";
import COLORS from "../src/consts/colors";
// import DatePicker from "react-native-neat-date-picker";
import DateField from "react-native-datefield";

export default function ReservationsForm() {
  // const [showDatePicker, setShowDatePicker] = useState(false);

  // const openDatePicker = () => {
  //   setShowDatePicker(true);
  // };

  // const onCancel = () => {
  //   // You should close the modal in here
  //   setShowDatePicker(false);
  // };

  // const onConfirm = (date) => {
  //   // You should close the modal in here
  //   setShowDatePicker(false);

  //   // The parameter 'date' is a Date object so that you can use any Date prototype method.
  //   console.log(date.getDate());
  // };
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
            />
            {/* <DatePicker
              isVisible={showDatePicker}
              mode={"single"}
              onCancel={onCancel}
              onConfirm={onConfirm}
            /> */}
            <TextInput
              style={globalStyles.input}
              placeholder="Duration"
              onChangeText={props.handleChange("Duration")}
              value={props.values.Duration}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Time"
              onChangeText={props.handleChange("Time")}
              value={props.values.Time}
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
