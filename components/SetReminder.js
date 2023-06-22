import React, { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MD2Colors, Menu, Divider } from "react-native-paper";
import styles from "../screens/styleScreens";
import Ionicons from "react-native-vector-icons/Ionicons";

const SetReminder = ({ valueReminder, handleReminder }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const menuItems = [
    { title: "No reminder", id: 1 },
    { title: "5 minutes before", id: 2 },
    { title: "15 minutes before", id: 3 },
    { title: "30 minutes before", id: 4 },
    { title: "1 hour before", id: 5 },
    { title: "4 hours before", id: 6 },
    { title: "a day before", id: 7 },
  ];

  const handleMenuItemPress = async (title) => {
    closeMenu();
    handleReminder(title);
  };

  return (
    <View style={styles.setReminderContainer}>
      <Text style={{ ...styles.textSetReminder, fontWeight: "600" }}>
        Set reminder
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
            <Text style={styles.textSetReminder}>{valueReminder}</Text>
            <Ionicons name="chevron-down" size={25} color={MD2Colors.grey700} />
          </TouchableOpacity>
        }
        anchorPosition="top"
        statusBarHeight={0}
      >
        {menuItems.map((menuItem, index) => (
          <React.Fragment key={index}>
            <Divider />
            <Menu.Item
              onPress={() => handleMenuItemPress(menuItem.title)}
              title={menuItem.title}
              style={{
                height: 25,
                marginVertical: 5,
              }}
            />
          </React.Fragment>
        ))}
      </Menu>
    </View>
  );
};

export default SetReminder;
