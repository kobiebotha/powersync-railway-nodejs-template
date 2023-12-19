import express from "express";
import path from "path";
import bodyParser from "body-parser";
import {apiRouter} from "./src/api/index.js";
import logRequest from "./src/middleware/logger.js";

const __dirname = path.resolve();
const app = express();

app.use(bodyParser.json());
app.use(logRequest);

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );

    // Pass to next layer of middleware
    next();
});

app.use('/api', apiRouter);

/**
 * Catch default route
 */
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'src/pages/index.html'))
});

export default app;
