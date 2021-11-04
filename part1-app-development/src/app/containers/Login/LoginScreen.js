import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  TextInput,
  View,
} from "react-native";
import colors from "../../../shared/colors";
import { useHistory } from "react-router-native";
import axios from "axios";
import { LoginScreenStyles as styles } from "./styles";
import { useDispatch } from "react-redux";
import { login } from "../../../store/user/actions";
import { isEmail } from "../../../shared/utils";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Username/Password không hợp lệ!");
      return;
    }
    if (!isEmail(username)) {
      Alert.alert("Email không đúng!");
      return;
    }

    setLoading(true);
    const account = {
      email: username,
      password: password,
    };

    axios
      .post(`https://reqres.in/api/login`, account)
      .then((res) => {
        const payload = {
          accessToken: res.data.token,
        };
        dispatch(login(payload));
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert(err.response.data.error);
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}

      <View style={styles.boxInput}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
        />
        <TextInput
          autoCapitalize="none"
          clearButtonMode="always"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>
      <View style={styles.boxButtonLogin}>
        <Button
          color={colors.white}
          title="Đăng nhập"
          onPress={() => handleLogin()}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
