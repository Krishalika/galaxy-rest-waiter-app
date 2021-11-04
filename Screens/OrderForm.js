import React, { useState, useEffect } from "react";
import { Button, TextInput, View, LogBox } from "react-native";
import { Formik } from "formik";
import { globalStyles } from "../styles/global";
import COLORS from "../styles/colors";
import { Dropdown } from "react-native-material-dropdown-v2-fixed";

export default function OrderForm() {
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);
  const statusData = [
    { value: "In Queue" },
    { value: "Processing" },
    { value: "Prepared" },
    { value: "Closed" },
  ];
  const [status, setStatus] = useState("");
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ Table: "", State: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              required
              keyboardType={"numeric"}
              style={globalStyles.input}
              placeholder="Table Number" 
              onChangeText={props.handleChange("Table")}
              value={props.values.Table}
            ></TextInput>
            <Dropdown
              label="Order status"
              data={statusData}
              value={props.values.State}
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
