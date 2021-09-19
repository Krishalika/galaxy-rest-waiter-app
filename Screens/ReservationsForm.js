import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";
import { globalStyles } from "../styles/global";
import COLORS from "../src/consts/colors";

export default function ReservationsForm() {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ Table: "", Name: "", Date: "", Price: "" }}
        onSubmit={(values) => {
          // actions.resetForm();
          // addReservation(values);
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

const styles = StyleSheet.create({});
