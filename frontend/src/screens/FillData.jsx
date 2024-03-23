import React, { useState, useRef } from "react";
import axios from "axios";
import "./Dashboard.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../slices/productsSlice";
import {
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,

} from "@mui/material";
// import { ArrowDownwardIcon, ArrowDropDownIcon } from "@mui/icons-material";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


const FillData = (props) => {
  const { items: products } = useSelector((state) => state.products);
    const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
    const ifData = props.formData;
    const setProductForEdit = props.setProductForEdit ;
  const [formData, setFormData] = useState(
    ifData
      ? ifData
      : {
          batch_code: "",
          name: "",
          description: "",
          colors: [],
          category_name: [],
          price: null,
          Height: "",
          Width: "",
          Brand: "",
          Material: "",
        }
  );
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

    // if (images.length === 0) {
    //   toast.error("Please select one or more images.");
    //   return;
    // }

    setUploading(true);

    try {
      const formDataWithImages = new FormData();
      for (let i = 0; i < images.length; i++) {
        formDataWithImages.append(`file`, images[i]);
      }
      // Append all form data except the image to a single key
      formDataWithImages.append("formData", JSON.stringify(formData));

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/uploadImageWithFormData`,
        formDataWithImages,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      addProductToRedux();
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
        Height: "",
        Width: "",
        Brand: "",
        Material:""
      });
        toast.success("Product Is Uploded");
        if (ifData) {
            setProductForEdit(null);
        }
    }
  };

  const addProductToRedux = () => {
    console.log("formData",formData)
    dispatch(addProduct(formData));
  }

  return (
    <div className="upload-form-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <TextField
            id="batch_code"
            label="SKU Code:"
            name="batch_code"
            placeholder="batch_code"
            variant="outlined"
            value={formData.batch_code}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="form-group">
          <TextField
            id="name"
            name="name"
            label="Name"
            placeholder="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="form-group">
          <TextField
            id="price"
            name="price"
            label="Price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="form-group">
          <TextField
            id="description"
            name="description"
            label="Description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="form-group">
          <TextField
            id="colors"
            name="colors"
            label="Colors (comma separated)"
            placeholder="Colors"
            value={formData.colors.join(",")}
            onChange={(e) =>
              setFormData({ ...formData, colors: e.target.value.split(",") })
            }
            fullWidth
            required
          />
        </div>
        <div className="form-group">
          <TextField
            id="category_name"
            name="category_name"
            label="Category Names (comma separated)"
            placeholder="Category Names"
            value={formData.category_name.join(",")}
            onChange={(e) =>
              setFormData({
                ...formData,
                category_name: e.target.value.split(","),
              })
            }
            fullWidth
            required
          />
        </div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Dimensions Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="form-group">
              <TextField
                id="Height"
                name="Height"
                label="Height"
                placeholder="Height"
                value={formData.Height}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Height: e.target.value,
                  })
                }
                fullWidth
              />
            </div>
            <div className="form-group">
              <TextField
                id="Width"
                name="Width"
                label="Width"
                placeholder="Width"
                value={formData.Width}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Width: e.target.value,
                  })
                }
                fullWidth
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <div className="form-group">
          <TextField
            id="Brand"
            name="Brand"
            label="Brand"
            placeholder="Brand"
            value={formData.Brand}
            onChange={(e) =>
              setFormData({
                ...formData,
                Brand: e.target.value,
              })
            }
            fullWidth
          />
        </div>
        <div className="form-group">
          <TextField
            id="Material"
            name="Material"
            label="Material"
            placeholder="Material"
            value={formData.Material}
            onChange={(e) =>
              setFormData({
                ...formData,
                Material: e.target.value,
              })
            }
            fullWidth
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Choose Image(s):</label>
          <input
            type="file"
            id="file"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>

        <Button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Data"}
        </Button>
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

export default FillData;
