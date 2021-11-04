import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import colors from "../../../shared/colors";
import { selectUser } from "../../../store/user/selectors";
import PhotoItem from "./components/PhotoItem";
import filter from "lodash.filter";
import { useHistory } from "react-router";

const ListPhoto = () => {
  const history = useHistory();
  const user = useSelector(selectUser);

  const [fullphotos, setFullPhotos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (typeof user.accessToken !== "string") {
      history.push("/login");
      return;
    }
    axios
      .get(`https://jsonplaceholder.typicode.com/photos`, {
        headers: {
          token: user?.accessToken,
        },
      })
      .then((res) => {
        setPhotos(res.data);
        setFullPhotos(res.data);
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert("Có lỗi xảy ra xin thử lại trong giây lát!");
          history.push("/login");
        }
      });
  }, [user?.accessToken]);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullphotos, (photo) => {
      return contains(photo, formattedQuery);
    });
    setPhotos(filteredData);
    setQuery(text);
  };

  const contains = ({ title }, query) => {
    if (title.includes(query)) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Danh sách hình ảnh</Text>
      </View>
      <View style={styles.boxInput}>
        <TextInput
          autoCapitalize="none"
          clearButtonMode="always"
          style={styles.input}
          value={query}
          autoFocus={true}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Tìm kiếm ..."
        />
      </View>
      {fullphotos.length <= 0 ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={photos}
          renderItem={({ item }) => <PhotoItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  boxTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.white,
    fontWeight: "400",
    fontSize: 18,
  },

  boxInput: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: colors.white,
    paddingHorizontal: 22,
  },
  input: {
    width: "100%",
    fontSize: 18,
    height: 44,
    margin: 12,
    borderRadius: 9,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
});

export default ListPhoto;
