import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import COLORS from "../src/consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import categories from "../src/consts/categories";
import foods from "../src/consts/Foods";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

//send props for navigation that it can navigate between screen
export default function Home({ navigation }) {
  const [selectedCategoryIndex, setselectedCategoryIndex] = React.useState(0);
  const [categoryItems, setcategoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const ListofCategories = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    fetch("http://10.0.2.2:5000/category")
      .then((res) => res.json())
      .then((results) => {
        setcategoryItems(results);

        console.log(results);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };
  useEffect(() => {
    ListofCategories();
  }, []);
  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
      >
        {/* {categories.map((category, index) => ( */}

        {categoryItems.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setselectedCategoryIndex(index)} //to select category
          >
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...styles.categoryBtn,
              }}
            >
              <View>
                <Image
                  // source={category.image}
                  source={{ uri: category.img }}
                  style={{
                    height: 45,
                    width: 45,
                    resizeMode: "center",
                    justifyContent: "center",
                    borderRadius: 45,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 10,
                  color: COLORS.white,
                }}
              >
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  const Card = ({ food }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("DetailsScreen", food)}
      >
        <View style={styles.card}>
          <View style={{ alignItems: "center" }}>
            <Image source={food.image} style={{ height: 120, width: 120 }} />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {food.name}
            </Text>
            <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
              {food.ingredients}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Rs.{food.price}
            </Text>
            <View style={styles.addToCartBtn}>
              <Icon name="add" size={20} color={COLORS.white} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  const logout = (props) => {
    AsyncStorage.removeItem("token").then(() => {
      //  navigation.replace("login");
      navigation.navigate("LoginScreen");
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Home" navigation={navigation} />
      <Icon
        name="logout"
        size={24}
        color="black"
        onPress={logout}
        style={{ marginLeft: 360 }}
      />
      <View
        style={{ marginTop: 20, flexDirection: "row", paddingHorizontal: 20 }}
      >
        <View style={styles.inputContainer}>
          {/* <Icon name="search" size={28} /> */}
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="item name"
          />
        </View>
        <View style={styles.inputContainer}>
          {/* <Icon name="search" size={28} /> */}
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="item code"
          />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="search" size={28} color={COLORS.white} />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        // data={categoryItems} //import foods
        data={foods} //import foods
        renderItem={({ item }) => <Card food={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesListContainer: {
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 55,
    width: 150,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImgCon: {
    height: 45,
    width: 45,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 15,
    elevation: 13, //shadow
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
});
