import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useHistory } from "react-router";
import colors from "../../../../shared/colors";

const PhotoItem = ({ item }) => {
  const history = useHistory();
  const colorItem = item.id % 2 == 0 ? "#E7F4FD" : colors.white;

  return (
    <TouchableOpacity
      onPress={() => history.push(`/photos/${item.id}`)}
      style={{
        backgroundColor: colorItem,
      }}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item?.thumbnailUrl }} />
        <View style={styles.text}>
          <Text numberOfLines={2} style={styles.title}>
            {item?.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    height: 78,
    padding: 10,
  },
  content: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: 56,
    height: 56,
    marginRight: 10,
    borderRadius: 9999,
    resizeMode: "cover",
  },
  text: {
    height: 56,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
  },
});

export default PhotoItem;
