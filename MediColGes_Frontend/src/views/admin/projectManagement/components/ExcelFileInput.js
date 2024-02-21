import React, { useState } from 'react';
import { Input, Box, Button } from '@chakra-ui/react';

const ExcelFileInput = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <Box>
      <Input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileInputChange}
        display="none" // Hide the input field
      />
      <Button backgroundColor={"#80808082"} as="label" htmlFor="file-input" cursor="pointer">
        Select Excel File
      </Button>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </Box>
  );
};

export default ExcelFileInput;
