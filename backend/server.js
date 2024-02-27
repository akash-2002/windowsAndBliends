import {getAllProductDetails} from './database.js'
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { uploadProductDetails, saveImagePath } from "./ProductUpload.js";
import { readExcelFileAndUpload } from "./xlsxSupporrt.js";
import ftp from "basic-ftp";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Define __dirname

const uploadImage = multer({ dest: "uploads/" }).array("file");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 5000;
app.use(bodyParser.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  })
  .promise();

// Serve static files (for downloading the Excel file)
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.post('/getAllcolors', async (req, res) => {
//   let colols= await getAllColors()
//   console.log(colols,'colors');
//   res.send(JSON.stringify(colols));
// });

app.post("/uploadDetatils", async (req, res) => {
  console.log(req.body);
  let Product = await uploadProductDetails(req.body);
  console.log("Product: ", Product);
  res.send(JSON.stringify(Product));
});



app.get("/getProducts", async (req, res) => {
  console.log("productApi is hit");
  const responce = await getAllProductDetails()
    .then((result) => {
      return "Product Details:", result;
    })
    .catch((error) => {
      return "Error:", error;
    });
  res.send(responce);
});

app.post("/uploadExcel", upload.single("excelFile"), async (req, res) => {
  const file = req.file;

  // console.log(file);
  // Process the uploaded file as needed (e.g., save to disk, parse, etc.)
  console.log("Received Excel file:", file.originalname);
  try {
    await readExcelFileAndUpload(req.file.buffer);
    res.send("Excel file uploaded successfully");
  } catch (e) {
    res.send("error while uploading : ", e);
  }
  // Respond to the client
});

app.post("/uploadImage", uploadImage, async (req, res) => {
  try {
    const file = req.file; // Assuming file is sent as 'file' field in the form
    console.log(file);
    ImageUpload(file, "");

    // Send the uploaded file name as response
    res.status(200).json({ fileName: remoteFileName });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

const ImageUpload = async (files, batch_code) => {
  const response = [];
  for (const file of files) {
    const remoteFileName = uuidv4() + "_" + file.originalname;
    console.log(file);
    const client = new ftp.Client();
    await client.access({
      host: "ftp.hitechwindowandblinds.com",
      user: "u989228710.image_upload",
      password: "Hitechbliends@321",
      secure: false,
    });
    saveImagePath(remoteFileName, batch_code);
    await client.uploadFrom(file.path, remoteFileName);
    await client.close();
    response.push({ fileName: remoteFileName });
  }
  return response;
};

app.post("/uploadImageWithFormData", uploadImage, async (req, res) => {
  try {
    const files = req.files; // Assuming multiple files are sent
    console.log("files", files);
    console.log("form data: ", req.body.formData);

    const formData = JSON.parse(req.body.formData);
    const isproductUploaded = await uploadProductDetails(formData);

    const response = await ImageUpload(files, formData.batch_code);
    console.log("isproductUploaded", isproductUploaded);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

app.post("/auth", async (req, res) => {
  console.log("authapihit");
  try {
    if (
      "HightechBliends@321" === req.body.password &&
      req.body.email === "info@hitechwindowandblinds.com"
    ) {
      res.send({
        tocken: "authanticated buy akash",
        profile: "Admin",
      });
    } else {
      throw { code: 500, message: "password or email is wrong doesn't match" };
    }
  } catch (error) {
    res.status(500).json({ error: "password or email is wrong doesn't match" });
  }
});

app.delete("/deleteProduct", async (req, res) => {
  try {
    // Assuming handleDelete is a function that delaetes the product based on batch_code
    handleDelete(req.body.batch_code);
    res
      .status(200)
      .send(`Product deleted with batch_code: ${req.body.batch_code}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the product.");
  }
});


const sslKey = fs.readFileSync(path.resolve(__dirname, "0003_key-certbot.pem"),"utf-8");
const sslCert = fs.readFileSync(
  path.resolve(__dirname, "0003_csr-certbot.pem"),
  "utf-8"
);
const ca = fs.readFileSync(
  path.resolve(__dirname, "certificate.pem"),
  "utf-8"
);
const options = {
  key: sslKey,
  cert: ca,
  ca: sslCert,
};
const server = https.createServer(options, app);
server.listen(port, async () => {
  console.log(`App listening at https://localhost:${port}`);
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("Connected to database");
  } catch (e) {
    console.log("Error while connecting to database:", e);
  }
});
