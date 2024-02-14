import {getAllProductDetails} from './database.js'
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { uploadProductDetails, saveImagePath } from "./ProductUpload.js";
import { readExcelFileAndUpload } from './xlsxSupporrt.js';
import ftp from "basic-ftp";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";


const uploadImage = multer({ dest: 'uploads/' }).single('file');
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
app.use(express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.post('/getAllcolors', async (req, res) => {
//   let colols= await getAllColors()
//   console.log(colols,'colors');
//   res.send(JSON.stringify(colols));
// });

app.post('/uploadDetatils', async (req, res) => {
  console.log(req.body);
  let Product= await uploadProductDetails(req.body)
  console.log("Product: ",Product);
  res.send(JSON.stringify(Product));
});

app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('Connected to database');
  }
  catch (e) {
    console.log('Error while connecting to database:', e);
  }
});




app.get('/getProducts', async (req, res) => {
  console.log("productApi is hit");
    const responce = await getAllProductDetails()
        .then((result) => {
        return ('Product Details:', result);
        })
        .catch((error) => {
        return ('Error:', error);
        });
        res.send(responce);
  });






  app.post('/uploadExcel', upload.single('excelFile'), async (req, res) => {
    const file = req.file;

    // console.log(file);
    // Process the uploaded file as needed (e.g., save to disk, parse, etc.)
    console.log('Received Excel file:', file.originalname);
    try{
    await readExcelFileAndUpload(req.file.buffer);
    res.send('Excel file uploaded successfully');
    }
    catch(e){
      res.send('error while uploading : ',e);
    }
      // Respond to the client
  });

  app.post("/uploadImage", uploadImage, async (req, res) => {
    try {
      const file = req.file;// Assuming file is sent as 'file' field in the form
      console.log(file);
      ImageUpload(file,"");


      // Send the uploaded file name as response
      res.status(200).json({ fileName: remoteFileName });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

const ImageUpload = async (file,batch_code) => {
  const remoteFileName = uuidv4() + "_" + file.originalname; // Generate a unique file name for the FTP server
  console.log(file);
      // Save the uploaded file to a local temporary directory

      // Connect to FTP server and upload the file
      const client = new ftp.Client();
      await client.access({
        host: "ftp.hitechwindowandblinds.com",
        user: "u989228710.image_upload",
        password: "Hitechbliends@321",
        secure: false, // Change to true if FTP server requires SSL/TLS
      });
      saveImagePath(remoteFileName, batch_code);
      // await client.cd(
      //   "/home/u989228710/domains/hitechwindowandblinds.com/public_html/assets"
      // );
      await client.uploadFrom(file.path, remoteFileName);
      // Close FTP connection
  await client.close();
  return { fileName: remoteFileName };
  };

    app.post("/uploadImageWithFormData", uploadImage, async (req, res) => {
      try {
        const file = req.file; // Assuming file is sent as 'file' field in the form
        console.log(file);
        console.log("form data: ",req.body.formData);
        const isproductUploaded=await uploadProductDetails(JSON.parse(req.body.formData));
        const responce = ImageUpload(file, JSON.parse(req.body.formData).batch_code);
        console.log("isproductUploaded", isproductUploaded); 
        // Send the uploaded file name as response
        res.status(200).json(responce);
      } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
      }
    });