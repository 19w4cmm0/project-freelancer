const express = require('express')
const cookieParser = require('cookie-parser')
const database = require("./config/database");
const bodyParser = require('body-parser');
require("dotenv").config();
const cors = require('cors')
const app = express()
const port = process.env.PORT;

database.connect();

const routesApiVer1 = require("./api/v1/routes/index.route");

app.use(cors())

//cookie
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());

// Routes version 1
routesApiVer1(app);
  

  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })