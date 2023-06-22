import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddScreen from "../screens/AddScreen";
import ListsScreen from "../screens/ListsScreen";
import SearchScreen from "../screens/SearchScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import TasksScreen from "../screens/TasksScreen";

const Tab = createBottomTabNavigator();
const focusColor = "#2F4858";
// const color = "#657A85";
const color = "#E1F6E8";
const headerColor = "#8fcbbc";
// const headerColor = "#C8FCEB";

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Tasks"
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 15,
          right: 15,
          elevation: 0,
          backgroundColor: headerColor,
          borderRadius: 15,
          height: 65,
          ...styles.shadow,
        },
        headerStyle: { backgroundColor: headerColor },
      }}
    >
      <Tab.Screen
        name="Lists"
        component={ListsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.barShow}>
              <Ionicons
                name="list"
                size={30}
                color={focused ? focusColor : color}
              />
              <Text
                style={{
                  fontSize: 14,
                  display: focused ? "flex" : "none",
                }}
              >
                Lists
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.barShow}>
              <Ionicons
                name="search-sharp"
                size={30}
                color={focused ? focusColor : color}
              />

              <Text
                style={{
                  color: focusColor,
                  fontSize: 14,
                  display: focused ? "flex" : "none",
                }}
              >
                Search
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          headerShown: false,
          headerTitle: "What would you like to do?",
          headerTitleAlign: "center",
          tabBarStyle: { display: "none" },
          tabBarButton: (props, focused) => (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 30,
              }}
            >
              <TouchableOpacity
                {...props}
                style={{
                  top: -10,
                  alignSelf: "center",
                  backgroundColor: "#E1F6E8",
                  // left: 5,
                  marginBottom: -20,
                  ...styles.shadowBtn,
                }}
              >
                <Ionicons
                  name="add-circle"
                  size={80}
                  color={focusColor}
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.barShow}>
              <Ionicons
                name="pie-chart"
                size={30}
                color={focused ? focusColor : color}
              />
              <Text
                style={{
                  color: focused ? focusColor : color,
                  fontSize: 14,
                  display: focused ? "flex" : "none",
                }}
              >
                Statistics
              </Text>
            </View>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "monospace",
            fontSize: 25,
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 20,
          },
          headerStyle: {
            backgroundColor: headerColor,
          },
        }}
      />

      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.barShow}>
              <Ionicons
                name="calendar"
                size={30}
                color={focused ? focusColor : color}
              />
              <Text
                style={{
                  color: focused ? focusColor : color,
                  fontSize: 14,
                  display: focused ? "flex" : "none",
                }}
              >
                Tasks
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    borderRadius: 30,
  },

  shadowBtn: {
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 7,
    // zIndex: 1,
  },

  barShow: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Tabs;
