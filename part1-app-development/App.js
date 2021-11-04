import * as React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import AppRoute from "./src/app/routes";
import { NativeRouter } from "react-router-native";
import { createStore } from "redux";
import { rootReducer } from "./src/store";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <StatusBar barStyle="default" translucent="true" />
        <SafeAreaView>
          <AppRoute />
        </SafeAreaView>
      </NativeRouter>
    </Provider>
  );
}
