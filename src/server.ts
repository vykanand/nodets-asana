require('dotenv').config();
import { app } from './app';
import helmet from 'helmet';
import cors from 'cors';
import { initalizeDB } from './config/db';

app.use(cors());
app.use(helmet());

app.options('*', cors());

initalizeDB();
app.listen(3333);