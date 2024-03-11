import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

const DropdownWithDynamicInput = ({ options, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddOption = () => {
    if (inputValue.trim() !== '') {
      const newOptions = [...options, inputValue];
      onChange(newOptions);
      setInputValue('');
      setSelectedValue(inputValue);
    }
  };

  return (
    <div>
      <TextField
        label="New Option"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <button onClick={handleAddOption}>Add Option</button>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="dropdown-label">Options</InputLabel>
        <Select
          labelId="dropdown-label"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          label="Options"
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropdownWithDynamicInput;
