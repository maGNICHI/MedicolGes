import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Icon,
  HStack,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  Box,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdDelete, MdUpdate } from "react-icons/md";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { Button } from "@chakra-ui/react";
import SwitchField from "components/fields/SwitchField";
export default function CheckTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      mt="30px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Users Table
        </Text>
        <Button
          w="150px"
          minW="140px"
          variant="brand"
          fontWeight="500"
          onClick={onOpen}
        >
          Add New User
        </Button>
        <Modal
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
          size="5xl"
        >
          <ModalOverlay />
          <ModalContent>
            <form>
              <ModalHeader>Add New User</ModalHeader>
              <hr />
              <ModalCloseButton />
              <ModalBody mt="10px">
                <Grid
                  templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
                  gap={4}
                >
                  {/* Left column */}
                  <Box>
                    <FormControl>
                      <FormLabel>Username</FormLabel>
                      <Input placeholder="Username" />
                    </FormControl>
                    <FormControl my="10px">
                      <FormLabel>LastName</FormLabel>
                      <Input placeholder="LastName" />
                    </FormControl>
                    <FormControl my="10px">
                      <FormLabel>FirstName</FormLabel>
                      <Input placeholder="FirstName" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email address</FormLabel>
                      <Input type="email" placeholder="Email" />
                    </FormControl>
                  </Box>
                  {/* Right column */}
                  <Box>
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" placeholder="*************" />
                    </FormControl>
                    <FormControl my="10px">
                      <FormLabel>Role</FormLabel>
                      <Select placeholder="Select Role">
                        <option>Admin</option>
                        <option>Participative Member</option>
                        <option>Coordinator Member</option>
                        <option>Patient</option>
                      </Select>
                    </FormControl>
                    <FormControl mt="47px">
                      <SwitchField
                        isChecked={true}
                        reversed={true}
                        fontSize="sm"
                        mb="20px"
                        id="1"
                        label="Item update notifications"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Birthdate</FormLabel>
                      <Input type="date" />
                    </FormControl>
                  </Box>
                </Grid>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Add
                </Button>
                <Button colorScheme="purple" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          <Tr>
            <Td fontSize={{ sm: "14px" }} borderColor="transparent">
              <Checkbox colorScheme="brandScheme" me="10px" />
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {/* Render empty cell */}
              </Text>
            </Td>
            <Td fontSize={{ sm: "14px" }} borderColor="transparent">
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {/* Render empty cell */}
              </Text>
            </Td>
            <Td fontSize={{ sm: "14px" }} borderColor="transparent">
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {/* Render empty cell */}
              </Text>
            </Td>
            <Td fontSize={{ sm: "14px" }} borderColor="transparent">
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {/* Render empty cell */}
              </Text>
            </Td>
            <Td fontSize={{ sm: "14px" }} borderColor="transparent">
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {/* Render empty cell */}
              </Text>
            </Td>
            <Td fontSize={{ sm: "14px" }} borderColor="transparent">
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {/* Render empty cell */}
              </Text>
            </Td>
            <Td fontSize={{ sm: "14px" }} borderColor="transparent">
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {/* Render empty cell */}
              </Text>
            </Td>
            <Td fontSize={{ sm: "14px" }} borderColor="transparent">
              <Text color={textColor} fontSize="sm" fontWeight="700">
                {/* Render empty cell */}
              </Text>
            </Td>
            <Td fontSize={{ sm: "14px" }} borderColor="transparent">
              <HStack spacing={1}>
                <Button w="40px" minW="30px" variant="brand" fontWeight="500">
                  <Icon
                    as={MdDelete}
                    width="20px"
                    height="20px"
                    color="inherit"
                  />
                </Button>
                <Button w="40px" minW="30px" variant="brand" fontWeight="500">
                  <Icon
                    as={MdUpdate}
                    width="20px"
                    height="20px"
                    color="inherit"
                  />
                </Button>
              </HStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Card>
  );
}
