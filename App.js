import "react-native-gesture-handler";

import React from "react";
import Tabs from "./navigation/tabs";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
