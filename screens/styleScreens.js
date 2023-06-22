import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  //style list-- Tasks Screen
  containerList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 95,
    marginHorizontal: -30,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 5,
  },

  shadow: {
    shadowColor: "#4DA79D",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 0,
  },

  // sectionList header
  header: {
    fontSize: 20,
    // backgroundColor: "#ff4",
    margin: 5,
    fontFamily: "monospace",

    paddingLeft: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
  },

  title: {
    fontSize: 24,
  },

  //tasksScren arrows
  iconArrow: {
    borderRadius: 50,
    shadowColor: "#4DA79D",
    // shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },

  iconBtn: {
    backgroundColor: "#fff",
    zIndex: 1,
    borderRadius: 50,
  },

  //tasksScreen main
  tasksScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#E1F6E8",
  },

  // AddScreen
  input: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#fff",
    zIndex: -1,
  },

  dropDown: {
    width: 250,
    borderColor: "#2F4858",
    borderRadius: 20,
    borderWidth: 0.5,
  },

  iconCategorie: {
    borderWidth: 1,
    borderColor: "#2F4858",
    borderRadius: 20,
    paddingLeft: 2,
    backgroundColor: "#fff",
  },

  // Task title adn notes
  taskContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    margin: 10,
    borderRadius: 20,
  },

  inputTask: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    margin: 10,
    fontSize: 20,
  },

  inputNotes: {
    marginHorizontal: 10,
    fontSize: 15,
    paddingLeft: 10,
    borderWidth: 0.5,
    marginBottom: 5,
    borderRadius: 5,
    height: 50,
  },

  // remainder: date and time
  reminderContainer: {
    marginHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  dateContainer: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },

  textReminder: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "700",
  },

  reminderBtn: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2F4858",
    shadowColor: "#4DA79D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },

  textTouchable: {
    fontSize: 20,
    textAlign: "center",
    paddingLeft: 5,
  },

  setReminderContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 5,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },

  textSetReminder: {
    fontSize: 16,
  },

  // priority
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    padding: 5,
    borderRadius: 20,
  },

  textSetPriority: {
    fontSize: 16,
    fontWeight: "600",
  },

  priorityBtn: {
    backgroundColor: "green",
    width: 35,
    paddingVertical: 4,
    borderRadius: 50,
    alignItems: "center",
    marginLeft: 10,
  },
});

export default styles;
