import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  IconButton,
  Link,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";

import { useState } from "react";
import { FaTrash, FaPen, FaInfoCircle } from "react-icons/fa";

import "./UserTable";

const CheckTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  
  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleDelete = (index) => {
    // Handle delete logic here
  };

  const handleEdit = (index) => {
    // Handle edit logic here
  };

  const handleInfo = (index) => {
    // Handle info logic here
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <Box overflowX="auto" maxWidth="200px" minWidth="100%">
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>
              <Box fontWeight={600}>Username</Box>
            </Th>
            <Th>
              <Box fontWeight={600}>FirstName</Box>
            </Th>
            <Th>
              <Box fontWeight={600}>LastName</Box>
            </Th>
            <Th>
              <Box fontWeight={600}>Email</Box>
            </Th>
            <Th>
              <Box fontWeight={600}>Birthdate</Box>
            </Th>
            <Th>
              <Box fontWeight={600}>Role</Box>
            </Th>
            <Th>
              <Box fontWeight={600}>Has Access</Box>
            </Th>
            <Th>
              <Box fontWeight={600}>Action</Box>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox />
                </Td>
                <Td>{row.username}</Td>
                <Td>{row.firstname}</Td>
                <Td>{row.lastname}</Td>
                <Td>{row.email}</Td>
                <Td>{row.birthdate}</Td>
                <Td>{row.role}</Td>
                <Td>{row.hasAccess}</Td>
                <Td>
                  <Flex>
                    <Link onClick={() => handleDelete(index)}>
                      <IconButton icon={<FaTrash />} color="#0236be" />
                    </Link>
                    <Link mx={4} onClick={() => handleEdit(index)}>
                      <IconButton icon={<FaPen />} color="#0236be" />
                    </Link>
                    <Link onClick={() => handleInfo(index)}>
                      <IconButton icon={<FaInfoCircle />} color="#0236be" />
                    </Link>
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="center">
        <Flex mt={4} justifyContent="center" alignItems="center">
          <Button onClick={handlePreviousPage} mr={4} disabled={page === 0}>
            Previous
          </Button>
          <Text mr={4}>
            Page {page + 1} of {totalPages}
          </Text>
          <Button onClick={handleNextPage} disabled={page === totalPages - 1}>
            Next
          </Button>
      </Flex>
      </Box>
    </Box>
  );
}
export default CheckTable;
