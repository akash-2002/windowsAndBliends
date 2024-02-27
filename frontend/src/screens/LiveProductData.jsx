// import React, { useState } from "react";
// import Dashboard from "./Dashboard";
// import { deleteProduct } from "../slices/productsSlice";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import { Edit, Delete, Refresh } from "@mui/icons-material";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// const LiveProductData = () => {
//   const { status, items: products } = useSelector((state) => state.products);
//   const [productForEdit, setProductForEdit] = useState(null);

//   const handleEditClick = (product) => {
//     setProductForEdit(product);
//   };
//   const handleDelete = async (batch_code) => {
//        try {
//     const response = await fetch(`http://13.53.103.57:5000/deleteProduct`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         // Add any additional headers if required
//       },
//       body: JSON.stringify({ batch_code: batch_code }), // Include the request body here
//     });
//     // const data = await response.json();
//     // Perform any additional actions after successful deletion
//   } catch (error) {
//          console.error('Error deleting data:', error);
//          toast.error('Error deleting data:', error);
//     // Handle errors appropriately
//     }
//        finally {
//          toast.success("Deleted successfully");

//          const updatedData = data.filter(
//            (item) => item.batch_code !== batchCode
//          );
//          dispatch(deleteProduct(updatedData));
//     }
    
//   }
//   const editProductsComponent = () => {
//     console.log("product",productForEdit);
//     return (
//       <div>
//         <Dashboard product={productForEdit} />
//       </div>
//     );
//   };

//   return (
//     <div>
//       {productForEdit ? (
//         editProductsComponent()
//       ) : (
//         <TableContainer component={Paper} style={{ marginTop: "5rem" }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   <Typography variant="h6" component="div" fontWeight="bold">
//                     Batch Code
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="h6" component="div" fontWeight="bold">
//                     Name
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="h6" component="div" fontWeight="bold">
//                     Category
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="h6" component="div" fontWeight="bold">
//                     Actions
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {status === "success" ? (
//                 products.map((product) => (
//                   <TableRow key={product.id}>
//                     <TableCell>{product.batch_code}</TableCell>
//                     <TableCell>{product.product_name}</TableCell>
//                     <TableCell>{product.categories.join(", ")}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         color="primary"
//                         aria-label="Edit"
//                         onClick={() => handleEditClick(product)}
//                       >
//                         <Edit />
//                       </IconButton>
//                       <IconButton color="error" aria-label="Delete"
//                       onClick={()=>handleDelete(product.batch_code)}>
//                         <Delete />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : status === "loading" ? (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center">
//                     Loading...
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center">
//                     Status: {status}
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// };

// export default LiveProductData;
