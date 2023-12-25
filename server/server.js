import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import audioApi from './api/audio.js';
dotenv.config();
// //import database configuration
import dbConfig from './db/dbConfig.js';
// //import routes
// import routes from './routes';

//initialize our express app
const app = express();
//initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//initialize cors middleware
app.use(cors());
//define port
const port = process.env.PORT || 4000;

//initialize root route
app.get('/', (req, res) => {
    res.send('Hello World');
});

//use audio API routes in the App
app.use('/api', audioApi);
//start server
app.listen(port, function () {
    console.log(`Server is running on port: ${port}`);
    dbConfig();
    
});
//# sourceMappingURL=server.js.map
