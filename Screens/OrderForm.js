import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";
import { globalStyles } from "../styles/global";
import COLORS from "../src/consts/colors";

export default function OrderForm() {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ Table: "", State: "", Price: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              required
              // keyboardType='numberic'
              style={globalStyles.input}
              placeholder="Table Number" //on the values it updates table prop
              onChangeText={props.handleChange("Table")}
              value={props.values.Table}
            ></TextInput>
            <TextInput
              style={globalStyles.input}
              placeholder="Order Status" //on the values it updates table prop
              onChangeText={props.handleChange("State")}
              value={props.values.State}
            ></TextInput>
            {/* <TextInput
              style={globalStyles.input}
              placeholder="Total Price" //on the values it updates table prop
              onChangeText={props.handleChange("Price")}
              value={props.values.Price}
            ></TextInput> */}
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
