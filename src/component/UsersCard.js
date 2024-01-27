import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card, Switch } from "react-native-paper";
import React, { useState } from "react";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const UsersCard = ({ item }) => {
  const data = item;
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.main_detail}>
      <Card>
        <Card.Title
          title={data.name}
          titleVariant="titleLarge"
          subtitle={data.email}
          left={LeftContent}
          right={(prpps) => (
            <View style={styles.switch_parent}>
              <Switch
                style={styles.switches}
                {...prpps}
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
              />
              <Text>{isSwitchOn ? "Active" : "Inactive"}</Text>
            </View>
          )}
        />
        <Card.Content>
          <Text variant="titleLarge">
            <Text style={styles.titleHead}>Phone: </Text>
            {data.contact_no}
          </Text>
          <Text variant="bodyMedium">
            <Text style={styles.titleHead}>Address: </Text>
            {data.address}
          </Text>
        </Card.Content>
        {/**
      
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      
      */}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  item_img: {
    borderRadius: 4,
    padding: 5,
  },
  main_detail: {
    padding: 5,
  },
  titleHead: {
    fontWeight: "600",
  },
  switch_parent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  switches: {
    marginBottom: 5,
  },
});

export default UsersCard;
