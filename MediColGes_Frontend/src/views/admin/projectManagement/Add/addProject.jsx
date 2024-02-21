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
  Center,
  Textarea,
} from "@chakra-ui/react";
import React, { useMemo } from "react";

// Custom components
import Card from "components/card/Card";
import { Button } from "@chakra-ui/react";
import SwitchField from "components/fields/SwitchField";
import ExcelFileInput from '../components/ExcelFileInput'; // Import ExcelFileInput component
import ProjectCard from "../components/ProjectCard";
import { blacken } from "@chakra-ui/theme-tools";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

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
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }} // Two columns on large screens, one column on small screens
        gap={4} // Space between the columns
      >
        {/* Left column (form inputs) */}
        <form>
          <Box>
            <FormControl>
              <FormLabel>Name Of The Project</FormLabel>
              <Input placeholder="Name" isRequired />
            </FormControl>
            <FormControl my="10px">
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Description" />
            </FormControl>
            <Box>
              <FormControl my="10px">
                <Flex className="justify-between" gap={5}>
                  <FormLabel mt={2}>Upload Excel File</FormLabel>
                  <ExcelFileInput onFileSelect={handleFileSelect} />
                </Flex>
              </FormControl>
            </Box>
            <FormControl my="10px">
              <FormLabel>Under The Organization</FormLabel>
              <Select placeholder="Select Organization">
                <option>MISCO</option>
              </Select>
            </FormControl>
            <FormControl my="10px">
              <Flex className="justify-between" gap={5}>
                <FormLabel mt={2}>Add Form</FormLabel>
                <Button backgroundColor={"#80808082"}>
                  Add Questionnaire
                </Button>
              </Flex>
            </FormControl>
          </Box>
          <Flex className="justify-between">
            <Button colorScheme="blue" mr={3}>
              Add
            </Button>
            <NavLink to="/admin/projects">
              <Button colorScheme="purple" mr={3}>
                Back To Project List
              </Button>
            </NavLink>
          </Flex>
        </form>

        {/* Right column (ProjectCard) */}
        <Box>
          <Center mt="90px">
            <ProjectCard />
          </Center>
        </Box>
      </Grid>
    </Card>
  );
}
