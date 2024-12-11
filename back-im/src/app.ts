import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export const app = express();
dotenv.config(); 
app.use(express.json());
app.use(cors()); 

app.listen(8080, () => {
    console.log("Server is running  in http://localhost:8080")
  })

