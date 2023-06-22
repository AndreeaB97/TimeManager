// NOT USED !!!!

import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TasksModal = ({ visible, message }) => {
  // const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row",
              // gap: 20,
            }}
          >
            {message ? (
              <>
                <Ionicons
                  name="checkmark-outline"
                  style={[styles.icon, styles.iconTextStyle]}
                  size={25}
                />
                <Text style={styles.modalText}>Successfully added!</Text>
              </>
            ) : (
              <>
                <Ionicons
                  name="alert-outline"
                  style={[
                    styles.icon,
                    styles.iconTextStyle,
                    { backgroundColor: "orange" },
                  ]}
                  size={30}
                />
                <Text style={styles.modalText}>Nothing to save!</Text>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.40)",
    marginTop: 20,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    // backgroundColor: "",
  },

  icon: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    backgroundColor: "green",
  },

  iconTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default TasksModal;
