import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserAction, UserKey } from "./constants";

const loadAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(UserKey.ACCESS_TOKEN);
  } catch {
    // error reading value
  }
};

const userInitialState = {
  accessToken: loadAccessToken(),
};

export const userReducer = (prevState = userInitialState, action) => {
  switch (action.type) {
    case UserAction.SET_USER:
      return { ...prevState, ...action.payload };
    case UserAction.LOGIN:
      AsyncStorage.setItem(UserKey.ACCESS_TOKEN, action.payload.accessToken);
      return {
        ...prevState,
        accessToken: action.payload.accessToken,
      };
    case UserAction.LOGOUT:
      AsyncStorage.removeItem(UserKey.ACCESS_TOKEN);
      return {};
    default:
      return prevState;
  }
};
