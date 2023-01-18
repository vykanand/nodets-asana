require('dotenv').config();
import { app } from './app';
import helmet from 'helmet';
import cors from 'cors';
import { initalizeDB } from './config/db';

app.use(cors());
app.use(helmet());

app.options('*', cors());

(async () => {
    const port = process.env.SERVER_PORT;
    const connectionStatus = await initalizeDB();
    connectionStatus == 1 ? (() => {
        app.listen(port);
        console.log('Started server on ' + port)
    })() : console.log('mongodb connection failed');
})();
