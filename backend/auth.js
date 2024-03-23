import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();
export const register = async (body) => {
    console.log(pool);
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    var isExist = await checkIfUserAlreadyExist(body.email, connection);
    if (isExist) {
        throw Error("user already exist");
    }
    try {
        const res = await createUser(body, connection);
        console.log(res);
    }
    catch (e) {
        throw Error(e)
    }
    await connection.commit();
    await connection.release();
}

const checkIfUserAlreadyExist = async (email, connection) => {
  const [result] = await connection.query(
    "select * from users where login_id=?",
    [email]
  );
  if (result.length > 0) {
    return true;
  }
    return false;
};

const createUser = async (body,connection) => {
    const query = `INSERT INTO users (login_id, name, number, password_hash) VALUES (?, ?, ?, ?)`;
    var passwordHash = await getencryptedPassword(body.password);
    console.log("password: ",body.password,"\n",passwordHash);

    // Execute the INSERT query with user data
    const [result] = await connection.execute(query, [
      body.email,
      body.name,
      body.number,
      passwordHash,
    ]);
    return result;
}
const getencryptedPassword = async(password) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the salt
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error encrypting password:', error);
        throw error;
    }
}
export const loginUser = async (body) => {
    try {
      const { email, password } = body;
      const connection = await pool.getConnection();
      await connection.beginTransaction();
      const query = "SELECT * FROM users WHERE login_id = ?";
      const [rows] = await connection.execute(query, [email]);

      // Close the database connection
      await connection.commit();
      await connection.release();
      if (rows.length === 0) {
        return { error: "User not found" };
      }

      const user = rows[0];

      // Compare password with hashed password
      const match = await bcrypt.compare(password, user.password_hash);

      if (!match) {
        return { error: "Password is incorrect" };
      }

      // Generate JWT token
      let token = jwt.sign(
        { email: user.login_id, name: user.name, number: user.number, role:user.role },
        "your_secret_key",
        { expiresIn: "1d" } // Expires in 1 day
        );
        if (user.role === "admin") {
            token = jwt.sign(
              { email: user.email, name: user.name, number: user.number, profile: "Admin" },
              "your_secret_key",
              { expiresIn: "1d" } // Expires in 1 day
            );
        }

      return { token };
    } catch (error) {
        console.error("An error occurred during login.", error);
        throw error;
    }
}

// if (
//   "HightechBlinds@321" === body.password &&
//   body.email === "info@hitechwindowandblinds.com"
// ) {
//   res.send({
//     tocken: "authanticated buy akash",
//     profile: "Admin",
//   });
// } else {
//   throw { code: 500, message: "password or email is wrong doesn't match" };
// }