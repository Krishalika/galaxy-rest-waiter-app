import * as React from "react";
import { ViewBase, StyleSheet, ScrollView, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

function CustomerDrawerContent(props){
    return(
        <ScrollView style={styles.container}>
            <View style={styles.drawerHeader}>
                <View>
                    <Text style={styles.drawerHeaderText}>Drawer Menu</Text>
                </View>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList
                icon={}
                label="Close drawer"
                onPress={() => props.navigation.closeDrawe()}
                ></DrawerItemList>
            </DrawerContentScrollView>
        </ScrollView>
    );
}

const styles= StyleSheet.create({
    container:{
        flex:1 //to center the content
    },
    drawerHeader: {
        backgroundColor:"#03cafc",
        height: 150,
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row'
    },
    drawerHeaderText:{
        color: 'white',
        fontSize: 24,
        fontWeight:'bold'
    }
})

export default function DrawerNavigation() {
  return <View></View>;
}
