const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const datasController = require("./controller/dnsController");
const userController = require("./controller/userController");

//create express app
const app = express();

// configure express app
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL).then(()=>console.log('connected database')).catch((e)=>console.log(e))


// routing for authentication

app.post("/signup", userController.register);

app.get("/signup", userController.fetchRegistered);

app.post("/login", userController.fetchedLogin);

// routing for data

app.get("/datas", datasController.fetchedDatas);

app.get("/datas/:id",datasController.fetchedData )

app.post("/datas", datasController.createData )

app.put("/datas/:id", datasController.updateData)

app.delete("/datas/:id", datasController.deleteData );



app.listen(3030,()=>{
    console.log('server running on port 3030')
});


