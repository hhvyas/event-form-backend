const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Award_Form = require('../event-form-backend/models/form');


//DB config
const db = "mongodb+srv://admin:admin@cluster0.qm6i0.mongodb.net/Award-Form?authSource=admin&replicaSet=atlas-j8osla-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

//Connect to mongodb
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Express App
const app = express();
app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use("/", require("./routes/index"))

app.listen(5001, '0.0.0.0');
