import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home, PeoplesDetails, PeoplesList, PlanetsList } from "../screens";

import { RootStackParams } from "../utils/RootStackParams";

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator<RootStackParams>();

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Screen
          name="PeoplesList"
          component={PeoplesList}
          options={{ headerShown: false }}
        />
        <Screen
          name="PeoplesDetails"
          component={PeoplesDetails}
          options={{ headerShown: false }}
        />
        <Screen
          name="PlanetsList"
          component={PlanetsList}
          options={{ headerShown: false }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
