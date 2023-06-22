import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MD2Colors, Menu, Divider } from "react-native-paper";
import styles from "../screens/styleScreens";
import Ionicons from "react-native-vector-icons/Ionicons";

const SetRepetition = ({ valueRepetition, handleRepetition }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const menuItems = [
    { title: "One time" },
    { title: "Daily" },
    { title: "Weekly" },
    { title: "Monthly" },
    { title: "Yearly" },
  ];

  const handleMenuItemPress = (title) => {
    // console.log(title);
    closeMenu();
    handleRepetition(title);

    // Alte acțiuni specifice titlului selectat
  };

  return (
    <View style={styles.setReminderContainer}>
      <Text style={{ ...styles.textSetReminder, fontWeight: "600" }}>
        Set repetition
      </Text>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
            }}
            onPress={openMenu}
          >
            <Text style={styles.textSetReminder}>{valueRepetition}</Text>
            <Ionicons name="chevron-down" size={25} color={MD2Colors.grey700} />
          </TouchableOpacity>
        }
        anchorPosition="top"
        statusBarHeight={0}
      >
        {menuItems.map((menuItem, index) => (
          <Menu.Item
            key={index}
            onPress={() => handleMenuItemPress(menuItem.title)}
            title={menuItem.title}
            style={{
              height: 25,
              marginVertical: 5,
            }}
          />
        ))}
      </Menu>
    </View>
  );
};

export default SetRepetition;
