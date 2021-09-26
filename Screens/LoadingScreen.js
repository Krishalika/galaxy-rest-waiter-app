import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

const LoadingScreen = (props) => {
  return (
    <>
      <View style={styles.loadingIcon}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loadingIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
