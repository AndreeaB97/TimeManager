// date time picker in TaskHeader, AddScreen
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimeReminder = ({ selected, handleChange, show, mode, screen }) => {
  const onChange = (event, selected) => {
    show(false);
    handleChange(selected);
  };

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={selected}
      mode={mode}
      is24Hour={true}
      display={"default"}
      minimumDate={new Date(2023, 1, 1)}
      onChange={onChange}
    />
  );
};

export default DateTimeReminder;
