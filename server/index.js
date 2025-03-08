import express from "express";
import mysql from 'mysql';
import cors from "cors";
import bcrypt from "bcrypt";


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee",
    port: 8889
});

db.getConnection((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

app.post('/login', async (req,res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM register WHERE email = ?"

    db.query(sql, [email], async (err, data) => {
        if(err) return res.json("Error");
        if(data.length > 0){
        let result = await bcrypt.compare(password, data[0]?.password);
            
            if(result) {
                res.json({ Login: true, message: "login successful" });
            } else {
                res.json({ Login: false, message: "login failed" });
            }

        }
        else{
            res.json({ Login: false, message: "login failed" });

        }
    })
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log("hashedPassword: ", hashedPassword);

    const sql = "INSERT INTO register (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: "Error inserting user", err });

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "User registered successfully" });
        } else {
            return res.status(400).json({ message: "Error registering user" });
        }
    });
});

app.listen(8000, ()=>{
    console.log("Server Listning...");
})

