const fs = require("fs");
const path = require("path");

module.exports = app => {

    //Variables for the notes
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);

    //API routes
    //This is for the route setup of API/notes
        app.get("/api/notes", function(req, res) {
            //db.json file and return all saved notes as json
            res.json(notes);
        });

    //This is the setup of the API/notes posting route
        app.post("/api/notes", function(req, res) {
        //here a new note is received and adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("New Note Added: " + newNote.title);
        });

    //here the note is retrieved by a specific id    
        app.get("/api/notes/:id", function(req, res){
            res.json(notes[req.params.id]);
        });

    // This deletes a note with a specific id    
        app.delete("/api/notes", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Delete note with id " + req.params.id);
        });


    //notes.html are displayed and accessed
        app.get("/notes", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));

        });

    //index.html are displayed when they are accessed through routes
        app.get("*", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

    //This will update the json files when ever they area added or deleted
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes,"\t"), err => {
                if (err) throw err;
                return true;
            });
        }

    });


}