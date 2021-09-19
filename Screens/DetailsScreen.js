import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SecondaryButton } from "../components/Button";
import COLORS from "../src/consts/colors";
import foods from "../src/consts/Foods";

//navigation-> allows to navigate between screen

const DetailsScreen = ({ navigation, route }) => {
  //To hold food details passed by the home screen
  const item = route.params;
  console.log(item);
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <Image source={item.image} style={{ height: 220, width: 220 }} />
        </View>
        <View style={styles.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, color: COLORS.white, fontWeight: "bold" }}
            >
              {item.name}
            </Text>
          </View>
          <Text style={styles.detailsText}>{item.description}</Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton
              title={"Add to Cart"}
              onPress={() => navigation.navigate("Cart", foods)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 220,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
});

export default DetailsScreen;

// import React from "react";
// import { View, StyleSheet, Text, Button } from "react-native";
// import Header from "../Header/Header";

// //send props for navigation that it can navigate between screens
// export default function DetailsScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Header title="Add to Cart" navigation={navigation} />
//       <View style={styles.content}>
//         <Text style={styles.text}>Details</Text>
//         <Button title="Go back" onPress={() => navigation.goBack()}></Button>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, //to center the content
//   },
//   content: {
//     backgroundColor: "#000220",
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   text: {
//     color: "#ffffff",
//     fontSize: 20,
//     fontWeight: "800",
//   },
// });
