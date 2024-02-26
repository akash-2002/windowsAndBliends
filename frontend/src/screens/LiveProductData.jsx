import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";

const LiveProductData = () => {
  const { status, items: products } = useSelector((state) => state.products);
  console.log("dashboard", products);

  return (
    <TableContainer component={Paper} style={{ marginTop: "5rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" component="div" fontWeight="bold">
                Batch Code
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" component="div" fontWeight="bold">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" component="div" fontWeight="bold">
                Category
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" component="div" fontWeight="bold">
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {status === "success" ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.batch_code}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.categories.join(", ")}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="Edit">
                    <Edit />
                  </IconButton>
                  <IconButton color="error" aria-label="Delete">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : status === "loading" ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Status: {status}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LiveProductData;
