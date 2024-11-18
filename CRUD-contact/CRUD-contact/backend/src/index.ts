import { AppDataSource } from "./data-source";
import mainRoutes from './routes/main.routes'
import cors from "cors";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json())

AppDataSource.initialize()
  .then(() => {
    console.log('database conncted')
  })
  .catch((error: any) => console.log(error))

app.use('', mainRoutes);

app.listen(port, () => {
  console.log(port);
  
  console.log(`[server]: Server is running at http://localhost:${port}`);
});



