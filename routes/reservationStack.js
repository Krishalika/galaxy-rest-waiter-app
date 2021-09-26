import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "react-native/Libraries/NewAppScreen";
import Reservations from "../Screens/Reservations";
import ReservationsForm from "../Screens/ReservationsForm";

const Stack = createStackNavigator();

const ReservationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reservations"
        component={Reservations}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header navigation={navigation} title="Reservations" />
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

export default ReservationStack;
