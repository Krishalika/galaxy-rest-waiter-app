import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "react-native/Libraries/NewAppScreen";
import Orders from "../Screens/Orders";
import OrderForm from "../Screens/OrderForm";

const Stack = createStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header navigation={navigation} title="Orders" />
            ),
          };
        }}
      />
      {/* <Stack.Screen
        name="Reservations"
        component={ReservationsForm}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header navigation={navigation} title="Reservations" />
            ),
          };
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default OrderStack;
