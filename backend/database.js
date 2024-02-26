import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port:process.env.MYSQL_PORT
}).promise();

export const checkConnection =async ()=>{
    try {
        const connection = await pool.getConnection();
        console.log("Connected to MySQL!");
        connection.release();
    } catch (error) {
        console.error("Error connecting to MySQL:", error);
    }
}
export const seeAllTables=async ()=>{
    const res = await pool.query("SHOW TABLES");
    console.log(res);
}
export async function getProductDetails(batchCode) {
  try {
      debugger
      const connection = await pool.getConnection();
      
      // Query to retrieve product details with colors and categories
      const sql = `
              SELECT p.name AS product_name, p.batch_code, p.address, p.description,
              JSON_ARRAYAGG(c.color_name) AS colors,
              JSON_ARRAYAGG(cat.category_name) AS categories,
              JSON_ARRAYAGG(i.image_url) AS images
              FROM products p
              LEFT JOIN product_colors pc ON p.batch_code = pc.batch_code
              LEFT JOIN colors c ON pc.color_id = c.color_id
              LEFT JOIN product_categories pcg ON p.batch_code = pcg.batch_code
              LEFT JOIN categories cat ON pcg.category_id = cat.category_id
              LEFT JOIN images i ON p.batch_code = i.batch_code
              WHERE p.batch_code = ?
              GROUP BY p.batch_code;
      `;
  
      const [rows] = await connection.query(sql, [batchCode]);
      connection.release();
  
      // Return the result
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  }

export async function getAllProductDetails() {
    try {
        const connection = await pool.getConnection();
        
        // Query to retrieve product details with colors and categories
        const sql = `
        SELECT p.name AS product_name, p.batch_code, p.address, p.description,p.price,
              JSON_ARRAYAGG(c.color_id) AS colors,
              JSON_ARRAYAGG(cat.category_name) AS categories,
              JSON_ARRAYAGG(i.image_url) AS images
        FROM products p
        LEFT JOIN product_colors pc ON p.batch_code = pc.batch_code
        LEFT JOIN colors c ON pc.color_id = c.color_id
        LEFT JOIN product_categories pcg ON p.batch_code = pcg.batch_code
        LEFT JOIN categories cat ON pcg.category_id = cat.category_id
        LEFT JOIN images i ON p.batch_code = i.batch_code
        GROUP BY p.batch_code;
        `;
    
        let [rows] = await connection.query(sql);
        rows = updatedata(rows);
        connection.release();
    
        // Return the result
        return rows;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
}


const updatedata = (rows) => {
  return rows.map((singleRow) => {
    let image_url = singleRow["images"];
    let color_id = singleRow["colors"];
    let category_name = singleRow["categories"];

    let image_url_set = new Set(JSON.parse(image_url));
    let color_id_set = new Set(JSON.parse(color_id));
    let category_name_set = new Set(JSON.parse(category_name));
    return {
      ...singleRow,
      images: Array.from(image_url_set),
      colors: Array.from(color_id_set),
      categories: Array.from(category_name_set),
    };
  });
};

export const handleDelete = async (batch_code) => {
  const connection = await pool.getConnection();
  await connection.query("delete from product_categories where batch_code=?", [
    batch_code,
  ]);
  await connection.query("delete from product_colors where batch_code=?", [
    batch_code,
  ]);
  await connection.query('delete from products where batch_code=?', [
    batch_code,
  ]);
}