import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IMG } from "../../backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageContext from "../context/Language/LanguageContext";

const ProductsCard = ({ item }) => {
  const navigation = useNavigation();
  const { language } = useContext(LanguageContext);

  // handling managing single user.
  const handleUser = (data) => {
    navigation.navigate("Detail", {
      data: data,
    });
  };

  const getItemName = () => {
    const getLanguage = {
      english: item.product_name_eng,
      hindi: item.product_name_hin,
      gujrati: item.product_name_guj,
    };
    return getLanguage[language];
  };

  return (
    <SafeAreaView style={styles.safe_view}>
      <Pressable onPress={() => handleUser(item)} style={styles.list_card}>
        <View style={styles.img_section}>
          {/*<FontAwesome name="user" size={35} color="grey" />*/}
          <Image
            style={styles.prodImage}
            source={{
              uri: `${IMG()}${item.product_image}`,
            }}
          />
        </View>
        <View style={styles.content_section}>
          <Text numberOfLines={3} style={styles.textName}>
            {getItemName()}
          </Text>
          <Text>
            <Text style={styles.content}>Price:</Text> {item.product_price}
          </Text>
          <Text>
            <Text style={styles.content}>Qty:</Text> {item.product_qty}
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list_card: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 8,
    margin: 5,

    // Android
    elevation: 5,

    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  img_section: {
    flex: 1,
    marginRight: 10,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4d4d4",
    borderRadius: 3,
  },
  prodImage: {
    width: 50,
    height: 50,
  },
  content_section: {
    flex: 4,
    width: "80%",
  },
  textName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  content: {
    fontWeight: "600",
  },
});

export default ProductsCard;
