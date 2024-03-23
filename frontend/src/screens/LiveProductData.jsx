import React, { useState,useCallback } from "react";
import FillData from "./FillData";
import { deleteProduct } from "../slices/productsSlice";
import { ToastContainer } from "react-toastify";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const LiveProductData = () => {
  const { status, items: products } = useSelector((state) => state.products);
  const [productForEdit, setProductForEdit] = useState(null);
  const dispatch = useDispatch();

  const handleEditClick = (product) => {
    const propProduct = {
      ...product,
      category_name: product.categories,
      name: product.product_name,
      Brand: product.brand,
      Height: product.height, // Assuming product.categories is the value you want to assign
      Width: product.width,
      Material: product.material,
    };
    setProductForEdit(propProduct);
  };
  const confirmDelete = (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      handleDelete(product.batch_code);
    }
  };
  const handleDelete = useCallback(
    async (batch_code) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/deleteProduct`,
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

        // Filter out the deleted product from the products array
        const updatedProducts = products.filter(
          (p) => p.batch_code !== batch_code
        );

        // Dispatch an action to update the store with the filtered products
        dispatch(deleteProduct(updatedProducts));
      } catch (error) {
        console.error("Error deleting data:", error);
        toast.error("Error deleting data");
      }
    },
    [products, dispatch]
  );

  const editProductsComponent = () => {
    console.log("product", productForEdit);
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
        <FillData
          formData={productForEdit}
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
                        <FaEdit style={{ display: "inline" }} /> edit
                      </button>
                      <button onClick={() => confirmDelete(product)}>
                        <FaTrashAlt style={{ display: "inline" }} /> Delete
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
