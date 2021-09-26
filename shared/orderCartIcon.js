import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

const orderCartIcon = (props) => {
  return (
    <View style={{ padding: 5 }}>
      <View
        style={{
          position: "absolute",
          height: 30,
          width: 30,
          borderRadius: 15,
          backgroundColor: "rgba(95,197,123,0.8)",
          right: 15,
          bottom: 15,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>0</Text>
        {props.OrderCart.length}
      </View>
      <Icon name="ios-cart" size={30} />
    </View>
  );
};

//what we want to extract from store
const mapStateToProps = (state) => {
  return {
    OrderCart: state,
  };
};

export default connect()(orderCartIcon);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
