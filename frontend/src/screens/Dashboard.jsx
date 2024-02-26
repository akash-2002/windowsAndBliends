import React, { useState, useRef  } from "react";
import axios from "axios";
import "./Dashboard.css";
import { toast } from "react-toastify";


const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formData, setFormData] = useState({
    batch_code: "",
    name: "",
    description: "",
    colors: [],
    category_name: [],
    price: null,
  });
  const fileInputRef = useRef(null);

  // Function to clear the selected files
  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the value to empty string
    }
  };
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please select one or more images.");
      return;
    }

    setUploading(true);

    try {
      const formDataWithImages = new FormData();
      for (let i = 0; i < images.length; i++) {
        formDataWithImages.append(`file`, images[i]);
      }
      // Append all form data except the image to a single key
      formDataWithImages.append("formData", JSON.stringify(formData));

      const response = await axios.post(
        "http://127.0.0.1:5000/uploadImageWithFormData",
        formDataWithImages,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedFiles(response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again later.");
    } finally {
      await setUploading(false);
      clearFileInput();
      setImages([]);
      setFormData({
        batch_code: "",
        name: "",
        description: "",
        colors: [],
        category_name: [],
        price: "",
      });
      toast.success("Product Is Uploded");
    }
  };

  return (
    <div className="upload-form-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="batch_code">Batch Code:</label>
          <input
            type="text"
            id="batch_code"
            name="batch_code"
            placeholder="Batch Code"
            value={formData.batch_code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">price:</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="colors">Colors (comma separated):</label>
          <input
            type="text"
            id="colors"
            name="colors"
            placeholder="Colors"
            value={formData.colors.join(",")}
            onChange={(e) =>
              setFormData({
                ...formData,
                colors: e.target.value.split(","),
              })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category_name">
            Category Names (comma separated):
          </label>
          <input
            type="text"
            id="category_name"
            name="category_name"
            placeholder="Category Names"
            value={formData.category_name.join(",")}
            onChange={(e) =>
              setFormData({
                ...formData,
                category_name: e.target.value.split(","),
              })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Choose Image(s):</label>
          <input
            type="file"
            id="file"
            multiple
            onChange={handleFileChange}
            required
            ref={fileInputRef}
          />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </form>
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h2>Data uploaded</h2>
          <h2>Uploaded Files:</h2>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.fileName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
