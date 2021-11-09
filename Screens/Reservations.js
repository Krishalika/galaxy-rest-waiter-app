import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
  Dimensions,
} from "react-native";
import Header from "../shared/Header";
import COLORS from "../styles/colors";
import { SecondaryButton,PrimaryButton,ReservationButton } from "../shared/Button";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReservationsForm from "./ReservationsForm";
import ReservationsForm1 from "./ReservationsForm1";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import moment from "moment";
const { width } = Dimensions.get("screen");
const cardWidth = width - 40;

export default function Reservations({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [reservationItem, setreservationItem] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const ListofReservations = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    console.log(token);

    fetch(`https://galaxy-rest-be.herokuapp.com/tableres`)
      .then((res) => res.json())
      .then((results) => {
        setreservationItem(results);
        console.log(results);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };
  useEffect(() => {
    ListofReservations();
  }, []);

  const ReservationsCard = ({ item }) => {
    return (
      <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9}>
        <View style={styles.ReservationsCard}>
          <Modal visible={modalVisible} animationType="none">
            <Icon
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalVisible(false)}
            />
            <ReservationsForm
              navigation={navigation}
              open={modalVisible}
              setOpen={setModalVisible}
            />
          </Modal>
          <View style={styles.tableNumCon}>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: COLORS.white }}
            >
              {item.table.tableNumber}
            </Text>
          </View>
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 10,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.customerName}
            </Text>

            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {moment(new Date(item.startTime)).format("h:mma")} -{" "}
              {moment(new Date(item.endTime)).format("h:mma")}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Rs.{item.price}
            </Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 14, color: "#808080" }}
            >
              {item.customerEmail}
            </Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 14, color: "#A9A9A9" }}
            >
              {item.customerContactNumber}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: COLORS.primary,
              }}
            >
              {item.date.substr(0, 10)}
            </Text>
          </View>
          <View style={{ marginRight: 20, alignItems: "center" }}></View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Reservations "
        navigation={navigation}
        style={styles.header}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <Modal
          visible={modalVisible}
          animationType="fade"
          style={styles.modalToggle}
        >
          <ReservationsForm />
        </Modal>
      </TouchableWithoutFeedback>

      <View
        // style={{
        //   alignSelf: "center",
        //   width: 200,
        //   marginTop: 10,
        //   marginBottom: 10,
        //   borderRadius: 10,
        // }}
      >
        {/* <Button
          title="ADD"
          style={{ fontWeight: "bold",backgroundColor:"black" }}
          onPress={() => setModalVisible(true)}
        /> */}
        <ReservationButton title={"ADD"} onPress={() => setModalVisible(true)} />
      </View>

      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={reservationItem}
          renderItem={({ item }) => <ReservationsCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          keyExtractor={(item, _id) => _id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => ListofReservations()}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    // backgroundColor: COLORS.light,
  },
  content: {
    // backgroundColor: COLORS.light,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tableContent: {
    flex: 5,
    height: 45,
    width: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
  },
  ReservationsCard: {
    height: 135,
    borderRadius: 10,
    elevation: 10,
    // width: 360,
    width: cardWidth,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginLeft: "auto",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "flex-end",
    width: 50,
    justifyContent: "flex-end",
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  tableNumCon: {
    height: 45,
    width: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
});
