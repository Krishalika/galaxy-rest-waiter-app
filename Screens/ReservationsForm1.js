import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { Formik, Field } from "formik";
import { globalStyles } from "../styles/global";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ReservationsForm1() {
  const reserveValidationSchema = yup.object().shape({
    name: yup.string().required("Customer name is required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email address is required"),
    contactNumber: yup
      .string()
      .matches(/(0)(\d){9}\b/, "Enter a valid phone number")
      .required("Phone number is required"),
    price: yup.string().required("Price is required"),
    // date: yup.string().required("Date is required"),
    timeStart: yup.string().required("Start time is required"),
    timeEnd: yup.string().required("End time is required"),
  });

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [isTimeStartPickerShow, setIsTimeStartPickerShow] = useState(false);

  const [resdate, setresDate] = useState(new Date(Date.now()));
  const [timetoStart, settimeStart] = useState("");
  const [timetoEnd, settimeEnd] = useState("");
  const [cusname, setCusName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [table, setTable] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setresDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const showStartPicker = () => {
    setIsTimeStartPickerShow(true);
  };

  const onStartChange = (event, value) => {
    settimeStart(value);
    if (Platform.OS === "android") {
      setIsTimeStartPickerShow(false);
    }
  };

  const submitReservation = () => {
    const data = {
      cusname,
      email,
      contactNumber,
      resdate,
      timetoStart,
      timetoEnd,
      price,
      table,
    };
    if (data.email && data.contactNumber && data.cusname) {
      fetch("http://10.0.2.2:5000/tableres/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cusname,
          email,
          contactNumber,
          resdate,
          timetoStart,
          timetoEnd,
          price,
          table,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // setFoodItems((prevFood)=>{
          //   return [data, ...prevFood]
          //  })
          console.log(data);
          Alert.alert("Table reservation added");
          setOpen(false);
        })
        .catch((err) => {
          Alert.alert("Something went wrong");
        });
    } else {
      Alert.alert("Please fill all the details");
    }
  };

  return (
    <View style={globalStyles.container}>
      {/* The date picker */}
      {/* <View style={styles.container}>
        {isPickerShow && (
          <DateTimePicker
            value={resdate}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}
      </View> */}
      {/* The start time picker */}

      {/* <View style={styles.container}>
        {isTimeStartPickerShow && (
          <DateTimePicker
            value={timetoStart}
            mode={"time"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onStartChange}
            style={styles.datePicker}
          />
        )}
      </View> */}

      <Formik
        initialValues={{
          cusname: "",
          email: "",
          contactNumber: "",
          date: "",
          timeStart: "",
          timeEnd: "",
          table: "",
          price: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={reserveValidationSchema}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              component={CustomInput}
              name="cusname"
              placeholder="Customer Name"
              onChangeText={(text) => setCusName(text)}
              value={cusname}
              // mode="outlined"
            />
            <Field
              component={CustomInput}
              name="email"
              placeholder="Email Address"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <Field
              component={CustomInput}
              name="contactNumber"
              placeholder="Contact Number"
              keyboardType="numeric"
              onChangeText={(text) => setContactNumber(text)}
              value={contactNumber}
            />
            <View>
              {isPickerShow && (
                <DateTimePicker
                  value={resdate}
                  mode={"date"}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  is24Hour={true}
                  onChange={onChange}
                  style={styles.datePicker}
                />
              )}
              <Field
                component={CustomInput}
                name="date"
                placeholder="Date"
                value={resdate.toLocaleDateString()}
                width="80%"
              />
              <Button title="Show Picker" color="purple" onPress={showPicker} />
            </View>

            <View>
              {isTimeStartPickerShow && (
                <DateTimePicker
                  value={timetoStart}
                  mode={"time"}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  is24Hour={true}
                  onChange={onStartChange}
                  style={styles.datePicker}
                />
              )}
              <Field
                component={CustomInput}
                name="timeStart"
                placeholder="Reservation starts at"
                // value={timetoStart.toString()}
                onChangeText={(text) => settimeStart(text)}
                value={timetoStart}
              />
              <Button
                title="Show Time Picker"
                color="purple"
                onPress={showStartPicker}
              />
            </View>
            <Field
              component={CustomInput}
              name="timeEnd"
              placeholder="Reservation ends at"
              onChangeText={(text) => settimeEnd(text)}
              value={timetoEnd}
            />
            <Field
              component={CustomInput}
              name="table"
              placeholder="Table Number"
              keyboardType="numeric"
              onChangeText={(text) => setTable(text)}
              value={table}
            />
            <Field
              component={CustomInput}
              name="price"
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={(text) => setPrice(text)}
              value={price}
            />
            {/* //disabled={!isValid}  */}
            <Button onPress={(handleSubmit, submitReservation)} title="SAVE" />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 50,
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: "black",
  },
  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
