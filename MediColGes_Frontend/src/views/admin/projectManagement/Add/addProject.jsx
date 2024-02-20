import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  Box,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React, { useMemo } from "react";

// Custom components
import Card from "components/card/Card";
import { Button } from "@chakra-ui/react";
import SwitchField from "components/fields/SwitchField";
import ExcelFileInput from '../components/ExcelFileInput'; // Import ExcelFileInput component

export default function AddProject() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Function to handle file selection
  const handleFileSelect = (file) => {
    // Handle the selected file here
    console.log('Selected file:', file);
  };

  return (
    <Card
      direction="column"
      w="100%"
      px="10px"
      mt="120px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Add New Project
        </Text>
      </Flex>
      <Flex>
        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>
          {/* Left column */}
          <form>
            <Box>
              <FormControl>
                <FormLabel>Name Of The Project</FormLabel>
                <Input placeholder="Name" isRequired/>
              </FormControl>
              <FormControl my="10px">
                <FormLabel>Description</FormLabel>
                <Input placeholder="Description" />
              </FormControl>
              <Box>
                <FormControl my="10px">
                  <FormLabel>Upload Excel File</FormLabel>
                  <ExcelFileInput onFileSelect={handleFileSelect} />
                </FormControl>
              </Box>
              <FormControl my="10px">
                <FormLabel>Under The Organization</FormLabel>
                <Select placeholder="Select Organization">
                  <option>MISCO</option>
                </Select>
              </FormControl>
            </Box>
            {/* Right column */}
            <Box>
              
            </Box>
            <Flex className="justify-between">
              <Button colorScheme="blue" mr={3}>
                Add
              </Button>
              <Button colorScheme="purple" mr={3}>
                Close
              </Button>
            </Flex>
          </form>
        </Grid>
      </Flex>
    </Card>
  );
}
