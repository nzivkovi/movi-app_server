// import the dependencies
import express from "express";
import pkg from 'body-parser';
const { json } = pkg;
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/movies.routes.js";
import { startDatabase, getDatabase } from "./db/mongo.js";
import { insertMovies } from "./controllers/movies.controller.js";
import { config } from "./config/config.js";


// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// use routes.js which contains our Express routes
app.use("/tmbd", routes);

// start the in-memory MongoDB instance
startDatabase().then(async () => {
    // load all movies from 
    try {
        insertMovies();
    } catch (error) {
        console.log("Error with uplaoding of movies");
    };

    // start the server
    app.listen(config.port, () => {
        console.log("listening on port " + config.port.toString());
    });
});