import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const TablePage = () => {
  const [statuses, setStatuses] = useState([
    { id: 1, fullName: "Suyash Gosh", mobile: "9234567890", email: "gogh@example.com", agent: "Priti", status: "red" },
    // { id: 2, fullName: "Nishtha Yadav", mobile: "9876543210", email: "nishtha@example.com", agent: "Nehal Saroj", status: "red" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatuses((prevStatuses) =>
        prevStatuses.map((status) => ({ ...status, status: "green" }))
      );
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Agent</TableCell>
            <TableCell>IP Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statuses.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{row.mobile}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.agent}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: row.status,
                    color: "white",
                  }}
                >
                  {row.status === "red" ? "Inactive" : "Active"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePage;
