import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { deleteProduct } from "../slices/productsSlice";
import { ToastContainer } from "react-toastify";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { Edit, Delete } from "@mui/icons-material";
const LiveProductData = () => {
  const { status, items: products } = useSelector((state) => state.products);
    const [productForEdit, setProductForEdit] = useState(null);
    const dispatch = useDispatch();

    const handleEditClick = (product) => {
        const propProduct = {
          ...product,
          category_name: product.categories,
          name: product.product_name, // Assuming product.categories is the value you want to assign
        };
    setProductForEdit(propProduct);
  };
  const handleDelete = async (batch_code) => {
    try {
      const response = await fetch(
        `https://ec2-13-53-103-57.eu-north-1.compute.amazonaws.com:5000/deleteProduct`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ batch_code }), // Simplified
        }
      );
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Failed to delete the product");
      }

      toast.success("Deleted successfully");
        // Assuming deleteProductAction is expecting just the batch_code to remove the product
        const pro=products.filter(()=>{products.batch_code != batch_code})
      dispatch(deleteProduct(pro));
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Error deleting data");
    }
  };

  const editProductsComponent = () => {
    console.log("product",productForEdit);
    return (
      <div>
        <Dashboard product={productForEdit} />
      </div>
    );
  };

  return (
    <div>
      <ToastContainer />
      {productForEdit ? (
        <Dashboard
          product={productForEdit}
          setProductForEdit={setProductForEdit}
        />
      ) : (
        <div style={{ marginTop: "1rem" }}>
          <table>
            <thead>
              <tr>
                <th>Batch Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {status === "success" &&
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.batch_code}</td>
                    <td>{product.product_name}</td>
                    <td>{product.categories.join(", ")}</td>
                    <td>
                      <button onClick={() => handleEditClick(product)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product.batch_code)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {status === "loading" && <p>Loading...</p>}
          {status !== "success" && status !== "loading" && (
            <p>Status: {status}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveProductData;
