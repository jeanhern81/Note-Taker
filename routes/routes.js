const fs = require("fs");
const path = require("path");

module.exports = app => {

    //Variables for the notes

    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);


    //API routes
    
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });



    })


}