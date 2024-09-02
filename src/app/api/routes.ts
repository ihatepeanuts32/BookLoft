import express from 'express';
import connectToDB from '../lib/mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())
connectToDB();




const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening from port: ${PORT}`);
})



