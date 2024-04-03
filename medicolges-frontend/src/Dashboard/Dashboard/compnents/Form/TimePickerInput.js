import React from "react";
import { TextField } from "@material-ui/core";

const TimePickerInput = ({ value, onChange }) => {
  return (
    <TextField
      id="time"
      label="Select Time"
      type="time"
      value={value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 minutes increment
      }}
    />
  );
};

export default TimePickerInput;
