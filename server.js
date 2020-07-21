

//these dependencies are required
const express = require("express");
const fs = require("fs");
const path = require("path");


//here the express app is initialized
const app = express();
const PORT = process.env.PORT || 3001;


//data parsing is setup here
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname));



//the required routes to the files
require("./routes/routes")(app);



//You will be notified if the port is listening
app.listen(PORT, function() {
    console.log("Your app is listening on port: " + PORT);
});