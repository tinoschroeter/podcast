const downloader = require("./libs/downloder.js");
const deleteItem = require("./libs/deleteItem.js");
const getData = require("./libs/getData.js");
const help = require("./libs/help.js");
const list = require("./libs/list.js");
const { setupDatabase, count } = require("./libs/utils.js");

const Database = require("better-sqlite3");
const dbFile = process.env.DBFILE || "./data.sql";
const folder = process.env.FOLDER || "./video/";

const db = new Database(dbFile);

const port = process.env.PORT || 3000;

const morgan = require("morgan");

const express = require("express");
const app = express();

setupDatabase(db);

app.use(morgan("combined"));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(folder));

app.get("/", getData(db));
app.get("/upload", help);
app.get("/upload/list", list(db));
app.put("/upload", (req, res) => res.send("not implemented yet!"));
app.post("/upload", downloader(db));
app.delete("/upload", deleteItem(db));
app.get("/count", count(db));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
