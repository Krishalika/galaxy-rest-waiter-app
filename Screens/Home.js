import React, { useState, useEffect } from "react";
import Header from "../shared/Header";
import COLORS from "../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dimensions, Image, StyleSheet, Text, View, Alert } from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

export default function Home({ navigation }) {
  const [selectedCategoryIndex, setselectedCategoryIndex] = React.useState(0);
  const [categoryItems, setcategoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedItems, setsortedItems] = useState([]);
  const [types, setTypes] = React.useState([]);
  const [names, setNames] = React.useState([]);
  const [codes, setCodes] = React.useState([]);
  const [textName, onChangeText] = React.useState("");
  const [textNumber, onChangeNumber] = React.useState("");

  const ListofCategories = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);

    fetch("https://galaxy-rest-be.herokuapp.com/category")
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

  const ListofCategoryItems = async (category) => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    fetch(
      "https://galaxy-rest-be.herokuapp.com/food/by-category?category=${category}"
    )
      .then((res) => res.json())
      .then((results) => {
        setsortedItems(results);

        console.log(results);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };

  const res = async (category) =>
    await axios
      .get(`https://galaxy-rest-be.herokuapp.com/food/by-category`, {
        params: { category: category },
      })
      .then(({ data }) => {
        setTypes(data);
      })
      .catch((e) => {
        console.log(e);
      });

  useEffect(() => {
    res("Pizza");
  }, []);

  const resNames = async (name) =>
    await axios
      .get(`https://galaxy-rest-be.herokuapp.com/food/by-name`, {
        params: { name: name },
      })
      .then(({ data }) => {
        setTypes(data);
      })
      .catch((e) => {
        console.log(e);
      });

  const resCodes = async (code) =>
    await axios
      .get(`https://galaxy-rest-be.herokuapp.com/food/by-code`, {
        params: { code: code },
      })
      .then(({ data }) => {
        setTypes(data);
      })
      .catch((e) => {
        console.log(e);
      });

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
      >
        {categoryItems.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              setselectedCategoryIndex(index);
              res(categoryItems[selectedCategoryIndex].name);
            }}
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
            <Image
              source={{ uri: food.img }}
              style={{
                height: 130,
                width: 130,
                borderRadius: 30,
                paddingTop: 10,
                marginTop: 10,
              }}
            />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {food.code}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {food.name}
            </Text>
          </View>
          <View
            style={{
              marginTop: 2,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#A9A9A9" }}
            >
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
      navigation.navigate("login");
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
        style={{
          marginTop: 20,
          flexDirection: "row",
          paddingHorizontal: 10,
          alignSelf: "center",
        }}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, fontSize: 16 }}
            placeholder="Item code"
            onChangeText={onChangeNumber}
            value={textNumber}
          />
          <Icon
            name="search"
            size={24}
            onPress={() => {
              if (textNumber != "")
                resCodes(textNumber), console.log(codes.length);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, fontSize: 16 }}
            placeholder="Item name"
            onChangeText={onChangeText}
            value={textName}
          />
          <Icon
            name="search"
            size={24}
            onPress={() => {
              if (textName != "") resNames(textName), console.log(names.length);
            }}
          />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={types}
        renderItem={({ item }) => <Card food={item} />}
        keyExtractor={(item, _id) => _id.toString()}
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
    backgroundColor: COLORS.white,
    alignItems: "center",
    paddingHorizontal: 20,
    marginEnd: 7,
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
