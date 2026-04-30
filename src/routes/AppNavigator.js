import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../layouts/Home";
import LayoutDetails from "../layouts/details/LayoutDetails";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: "Disney Characters" }} />
        <Stack.Screen name="Details" component={LayoutDetails} options={{ title: "Detalhes" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
