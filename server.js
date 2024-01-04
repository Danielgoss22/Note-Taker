const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
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
  const { title, text, note_id } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    const noteString = JSON.stringify(newNote);

    fs.readFile(`./db/db.json`, "utf8", (error, data) => {
      if (error) console.error(error);
      else {
        const parsedData = JSON.parse(data);
        parsedData.push(newNote);

        fs.writeFile(
          `./db/db.json`,
          JSON.stringify(parsedData, null, 4),
          (error) =>
            error
              ? console.error(error)
              : console.log("New note has been logged!")
        );
      }
    });
    const notes = {
      status: "success",
      body: newNote,
    };
    console.log(notes);
    res.status(201).json(notes);
  } else {
    res.status(500).json("Error in posting note.");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
