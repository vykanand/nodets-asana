require('dotenv').config()
import { app } from './app';
import helmet from "helmet";
import cors from "cors";

app.use(cors());
app.use(helmet());

app.options('*', cors());

app.listen(3333);