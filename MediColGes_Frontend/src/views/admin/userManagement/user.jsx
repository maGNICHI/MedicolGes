import { Box, SimpleGrid } from "@chakra-ui/react";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import React from "react";
import { userList } from "./dataTables/variables/columnsData";
import UserTable from './dataTables/components/UserTable';

export default function Users() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'>
        <UserTable columnsData={userList} tableData={tableDataCheck} />
      </SimpleGrid>
    </Box>
  );
}
