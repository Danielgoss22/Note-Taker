const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  console.log("hello");
  fs.readFile("./db/db.json", (error, data) => {
    if (error) {
      throw error;
    }
    const notes = JSON.parse(data);
    console.log(notes);
    res.send(notes);
  });
});

app.post("/api/notes", (req, res) => {
  console.log("save info");
  console.log(req.body);
  fs.readFile("./db/db.json");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
