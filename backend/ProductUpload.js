import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
}).promise();

const productDetails = 
  {
    batch_code: 'test321',
    name: 'honeycomb',
    discription: 'this is the best in class bliend',
    colors: [ 'fccaa2', '123123', '45sdgb' ],
    category_name: [ 'honecomb', 'treanding', 'best' ]
  }



// uploadProductDetails(productDetails);

export async function uploadProductDetails(req) {
  const productDetails = req;
  // console.log(req.batch_code);
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    console.log('con  made');
    const productInsertResult = await refreshProducts(connection,productDetails);
    // console.log("productadded: ",productInsertResult);
    await addColorsForProduct(productDetails.batch_code, productDetails.colors,connection);
    await addCategoriesForProduct(productDetails.batch_code, productDetails.categories,connection)
    connection.release();


    await connection.commit();

    return productInsertResult; 
  } catch (error) {
    // await connection.rollback();
    console.error('Error uploading product details:', error);
    throw error;
  }
}

async function refreshProducts(connection, productDetails) {
  console.log("product to upload", productDetails);
const batchCodeIf =  await connection.query('select * from products where batch_code=?',
[productDetails.batch_code]);
// console.log(batchCodeIf);
var productInsertResult;
if(batchCodeIf[0].length===0){
  productInsertResult = await connection.query(
    'INSERT INTO products (name, batch_code, address, description,price) VALUES (?, ?, ?, ?,?)',
    [productDetails.product_name, productDetails.batch_code, productDetails.address, productDetails.description,productDetails.price]
  );
}
else{
  productInsertResult = await connection.query(
    'UPDATE products SET name = ?, address = ?, description = ?,price=? WHERE batch_code = ?',
    [productDetails.product_name, productDetails.address, productDetails.description,productDetails.price,productDetails.batch_code]
  );
}
return productInsertResult;
}

export async function addColorsForProduct(batchCode, colors,connection) {
  
  for (const colorId of colors) {
    // Check if color name exists
    // console.log(existingColor[0])
    try {
      const existingColor = await checkColorIfExcist(colorId, connection);

      if (existingColor.length == 0) {
        // If color name doesn't exist, create a new entry
        const newColor = await connection.query(
          'INSERT INTO colors (color_id,color_name) VALUES (?,"colorname")',
          [colorId]
        );
        await connection.query(
          "INSERT ignore INTO product_colors (id,batch_code, color_id) VALUES (?, ?,?)",
          [batchCode + "_" + colorId, batchCode, colorId]
        );
        // Use the newly inserted color's ID
      } else {
        // If color name exists, use its ID directly
        await connection.query(
          "INSERT ignore INTO product_colors (id,batch_code, color_id) VALUES (?, ?,?)",
          [batchCode + "_" + colorId, batchCode, colorId]
        );
      }
    }
    catch (err) {
      console.log(err);
    }
  }

}

export async function addCategoriesForProduct(batchCode, categoryNames,connection) {
  // const connection = await pool.getConnection();
  // Get all existing categories
  const existingCategories = await getAllCategories(connection);
  
  for (const categoryName of categoryNames) {
        try {
        // Check if category ID exists
        const existingCategory = existingCategories.find(category => category.category_name === categoryName);
console.log("existingCategory", existingCategory);
        if (!existingCategory) {
          // If category ID doesn't exist, create a new entry
          const [categories] = await connection.query(
            "INSERT ignore INTO categories (category_name) VALUES (?)",
            [categoryName]
          );
          // Use the newly inserted category's ID
          await connection.query(
            "INSERT ignore INTO product_categories (id,batch_code, category_id) VALUES (?, ?,?)",
            [
              batchCode + "_" + categories.insertId,
              batchCode,
              categories.insertId,
            ]
          );
        } else {
          // If category ID exists, use its ID directly
          await connection.query(
            "INSERT INTO product_categories (id,batch_code, category_id) VALUES (?, ?,?)",
            [
              batchCode + "_" + existingCategory.category_id,
              batchCode,
              existingCategory.category_id,
            ]
          );
          // connection.release();
          // await connection.commit();
        }
      } catch (error) {
        console.error('Error adding categories for product:', error);
        // throw error;
      }
    }
}


export async function checkColorIfExcist(colorId,connection) {
  try {
    // const connection = await pool.getConnection();
    const [colors] = await connection.query('SELECT * FROM colors where color_id= ?',
    [colorId]);
    // connection.release();

    return colors;
  } catch (error) {
    console.error('Error fetching all colors:', error);
    throw error;
  }
}

export async function getAllCategories(connection) {
  try {
    const [colors] = await connection.query('SELECT * FROM categories');

    return colors;
  } catch (error) {
    console.error('Error fetching all colors:', error);
    throw error;
  }
}
export async function saveImagePath(fileName, batchCode) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  var pathname = "/assets/" + fileName;
  await connection.query(
    "INSERT INTO images (batch_code, image_url) VALUES (?, ?)",
    [batchCode, pathname]
  );
  await connection.commit();
  await connection.release();
}

