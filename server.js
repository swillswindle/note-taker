const express = require("express");
const path = require("path");
const notes = require("./db/db.json");
const PORT = process.env.PORT || 5000;
const { v4: uuidv4 } = require("uuid");
const app = express();
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => res.status(200).json(notes));

app.post("/api/notes", (req, res) => { 
  let savedNotes = fs.readFileSync('./db/db.json')
  let array = JSON.parse(savedNotes)
  req.body.id = uuidv4()
  array.push(req.body)
  fs.writeFileSync('./db/db.json', JSON.stringify(array))
  res.status(200).json(`Note Saved`)
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
