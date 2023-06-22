import React from "react";
import { View, StyleSheet, Modal, Text } from "react-native";

const ModalSucces = ({ visible }) => {
  return (
    <View style={styles.modalBackGround}>
      <Modal transparent isVisible={visible}>
        <View style={styles.modalContainer}>
          <Text>This is a popup message!</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    // flex: 1,
    // // backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});

export default ModalSucces;
