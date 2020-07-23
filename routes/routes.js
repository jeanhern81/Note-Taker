const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  // Variables for the notes
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);

    // API ROUTES
    

    // This is for the route setup of API and notes
    app.get("/api/notes", function (req, res) {
      //db.json file and return of all saved notes as json
      res.json(notes);
    });

    // This is the setup of the API and notes posting route
    app.post("/api/notes", function (req, res) {
      // Here a new note is received, added to db.json, then returns the new note
      let newNote = req.body;
      notes.push(newNote);
      updateDb();
      return console.log("Added a new note: " + newNote.title);
    });

    // Here the note is retrieves with specific id
    app.get("/api/notes/:id", function (req, res) {
      // display json for the notes array indices of the provided id
      res.json(notes[req.params.id]);
    });

    // This deletes a note with specific id
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      updateDb();
      console.log("Deleted note with id " + req.params.id);
    });

    // VIEW ROUTES
    

    // This is where notes.html is accessed and displayed
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    //index.html are displayed when they are accessed
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //this will update the json file whenever a note is added or deleted
    function updateDb() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
};