const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Award_Form = require('./models/form');



//DB config
const db = "mongodb://127.0.0.1:27017/event_RRU";

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

const routeForm = require("./routes/form");
const routeStats = require("./routes/stats")
const routeEventList = require("./routes/event_list")
const routeAuth = require("./routes/auth")


app.use("/form", routeForm)
app.use("/event_list", routeEventList)
app.use("/stats", routeStats)
app.use("/auth", routeAuth)
// app.use("/stats", require("./routes/stats"))
// app.use("/", require("./routes/index"))


app.listen(5001, '0.0.0.0');
