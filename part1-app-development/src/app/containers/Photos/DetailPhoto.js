import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import colors from "../../../shared/colors";
import { selectUser } from "../../../store/user/selectors";

const DetailPhoto = ({ match }) => {
  const user = useSelector(selectUser);
  const [photo, setPhoto] = useState();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos/${match?.params?.photoId}`,
        {
          headers: {
            token: user.accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPhoto(res.data);
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert("Không lấy được thông tin ảnh này!");
          history.push("/photos");
        }
      });
  }, [user.accessToken]);

  return (
    <View style={styles.container}>
      {photo ? (
        <>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>{photo?.title}</Text>
          </View>
          <View style={styles.boxImage}>
            <Image style={styles.image} source={{ uri: photo.url }} />
          </View>
          <View style={styles.boxButtonLogin}>
            <Button
              color={colors.white}
              title="Trở Lại"
              onPress={() => history.goBack()}
            />
          </View>
        </>
      ) : (
        <>
          <View>
            <ActivityIndicator size="large" />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",

    height: "100%",
  },

  boxTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.white,
    fontWeight: "400",
    fontSize: 18,
  },

  boxImage: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.yellow,
    paddingTop: 25,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
  },

  boxButtonLogin: {
    width: "100%",

    backgroundColor: colors.blue,
    fontWeight: "bold",

    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
});

export default DetailPhoto;
