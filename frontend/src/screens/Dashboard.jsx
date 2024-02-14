import React, { useState } from "react";
import axios from "axios";

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
  });

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
      alert("Please select one or more images.");
      return;
    }

    setUploading(true);

    try {
      const formDataWithImages = new FormData();
      for (let i = 0; i < images.length; i++) {
        formDataWithImages.append("file", images[i]);
      }

      // Append all form data except the image to a single key
        formDataWithImages.append("formData", JSON.stringify(formData));
        console.log("api formdata", JSON.stringify(formData));

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
      alert("Failed to upload images. Please try again later.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="batch_code">Batch Code:</label>
          <input
            type="text"
            id="batch_code"
            name="batch_code"
            placeholder="Batch Code"
            value={formData.batch_code}
            onChange={handleChange}
            style={{ display: "block" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={{ display: "block" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={{ display: "block" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
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
            style={{ display: "block" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
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
            style={{ display: "block" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="file">Choose Image(s):</label>
          <input
            type="file"
            id="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "block" }}
          />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </form>
      <div>
        {uploadedFiles.length > 0 && (
          <div>
            <h2>Uploaded Files:</h2>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>{file.fileName}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
