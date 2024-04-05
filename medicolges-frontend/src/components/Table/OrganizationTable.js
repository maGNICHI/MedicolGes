import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  Checkbox,
} from "@mui/material";
import IconButton from "../Button/IconButton";
import { FaInfoCircle, FaPen, FaShower, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Title from "../Title/Title";
import "./UserTable";
import axios from "axios";

const OrganizationTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/organization/"
        );
        setOrganizations(response.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <Paper>
      <div style={{overflowX:"auto", maxWidth: "200px", minWidth:"100%"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><Title fontWeight={600} title={"Name"} /></TableCell>
              <TableCell><Title fontWeight={600} title={"Address"} /></TableCell>
              <TableCell><Title fontWeight={600} title={"Phone Number"} /></TableCell>
              <TableCell><Title fontWeight={600} title={"Category"} /></TableCell>
              <TableCell><Title fontWeight={600} title={"Type"} /></TableCell>
              <TableCell><Title fontWeight={600} title={"Action"} /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations &&
              organizations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow 
                  // key={index}
                  >
                    <TableCell><Checkbox/></TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex" }}>
                        <NavLink ><FaTrash color="#0236be" /></NavLink> 
                        <NavLink className={"mx-4"}><FaPen color="#0236be" /></NavLink> 
                        <NavLink><FaInfoCircle color="#0236be" /></NavLink> 
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={organizations ? organizations.length : 0} // Added null check for data
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrganizationTable;
