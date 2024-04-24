import React from "react";
import { Input, FormLabel } from "@chakra-ui/react";

const TimePickerInput = ({ value, onChange }) => {
  return (
    <div>
      <FormLabel htmlFor="time">Select Time</FormLabel>
      <Input
        id="time"
        type="time"
        value={value}
        onChange={onChange}
        step={300} // 5 minutes increment
      />
    </div>
  );
};

export default TimePickerInput;