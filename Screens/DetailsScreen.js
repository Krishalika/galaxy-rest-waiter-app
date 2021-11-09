import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SecondaryButton } from "../shared/Button";
import COLORS from "../styles/colors";
import Toast from "react-native-toast-message";
import { addToCart } from "../redux";
import { useDispatch } from "react-redux";

const DetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);

  const item = route.params;
  const addThisToCart = () => {
    dispatch(addToCart({ ...item, quantity }));
    setQuantity(1);
    Toast.show({
      topOffset: 10,
      visibilityTime: 2000,
      position: "top",
      type: "success",
      text1: "Successfully added to the cart",
    });
  };

  const incQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView >
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} style={{paddingLeft:10}}/>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Details</Text>

        <View style={{ flexDirection: "row" }}></View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <Image
            source={{ uri: item.img }}
            testID="food"
            style={{ height: 220, width: 220, borderRadius: 20}}
          />
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
            <View style={{ marginRight: 0, alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: COLORS.white,
                }}
              >
                {quantity}
              </Text>
              <View style={styles.actionBtn}>
                <Icon
                  name="remove"
                  size={25}
                  color={COLORS.primary}
                  onPress={decQuantity}
                ></Icon>
                <Icon
                  name="add"
                  size={25}
                  color={COLORS.primary}
                  onPress={incQuantity}
                ></Icon>
              </View>
            </View>
          </View>
          <Text style={styles.detailsText}>{item.description}</Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton
              title={"ADD TO CART"}
              onPress={addThisToCart}
              disabled={quantity > 0 ? false : true}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // header: {
  //   paddingVertical: 20,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginHorizontal: 20,
  //   backgroundColor:COLORS.white
  // },
  header: {
    marginTop: 0,
    height: "100%",
    flexDirection: "row",
    // alignContent: "center",
    // justifyContent: "center",
    paddingLeft:20,
    backgroundColor: "white",
    alignItems:"center",
    height: 56,
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
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default DetailsScreen;
