import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv';

export const app = express();
dotenv.config(); 
app.use(express.json());
app.use(cors()); 

app.listen(3001, () => {
    console.log('Server is running  in http://localhost:3001')
  })

