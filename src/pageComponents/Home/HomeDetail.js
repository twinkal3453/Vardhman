import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Button,
  Card,
  Text,
  FAB,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { IMG } from "../../../backend";
import AuthenticateContext from "../../context/auth/AuthenticateContext";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const HomeDetail = ({ route }) => {
  const auth = useContext(AuthenticateContext);
  const { data } = route.params;
  const [count, setCount] = useState(1);

  const handleCount = (data) => {
    if (data === "inc") {
      setCount(count + 1);
    } else {
      if (count > 1) {
        setCount(count - 1);
      }
    }
  };

  const handleCalcPrice = (data) => {
    const value = parseFloat(data) * count;

    return value + ".00";
  };

  return (
    <View style={styles.card_Parent}>
      <Card>
        <Card.Cover
          style={styles.item_img}
          source={{
            uri: `${IMG()}${data.product_image}`,
          }}
        />
        <Card.Content>
          <Text variant="titleMedium">{data.product_name_eng}</Text>
          <Text variant="titleMedium">{data.product_name_guj}</Text>
          <Text variant="titleMedium">{data.product_name_hin}</Text>
          <Text variant="titleMedium">HSN Code: {data.product_hsn_code}</Text>
        </Card.Content>
        <Card.Content style={styles.middle_contnet}>
          <Text variant="titleMedium">
            Rs.{handleCalcPrice(data.product_price)}
          </Text>
          <Text variant="bodyMedium">
            Qty: {data.product_qty} * {count}
          </Text>
        </Card.Content>
        {auth.role === 0 && (
          <Card.Actions>
            <View style={styles.counter_parent}>
              <FAB
                size="small"
                icon="minus"
                style={styles.fab}
                onPress={() => handleCount("dec")}
              />
              <Text style={styles.count_text}>{count}</Text>
              <FAB
                size="small"
                icon="plus"
                style={styles.fab}
                onPress={() => handleCount("inc")}
              />
            </View>
            <Button mode="outlined" icon="cart">
              Add to cart
            </Button>
          </Card.Actions>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  item_img: {
    borderRadius: 4,
    padding: 5,
  },
  card_Parent: {
    padding: 5,
  },
  detail_component: {
    padding: 10,
  },
  middle_contnet: {
    padding: 4,
  },
  counter_parent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  count_text: {
    marginHorizontal: 10,
  },
});

export default HomeDetail;
