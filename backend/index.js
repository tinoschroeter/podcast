const downloader = require("./libs/downloder.js");
const getData = require("./libs/getData.js");
const help = require("./libs/help");
const { setupDatabase } = require("./libs/utils.js");

const Database = require("better-sqlite3");
const dbFile = process.env.DBFILE || "./data.sql";
const db = new Database(dbFile);

const port = process.env.PORT || 4000;

const morgan = require("morgan");

const express = require("express");
const app = express();

setupDatabase(db);

app.use(morgan("combined"));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", getData(db));
app.get("/upload", help);
app.post("/upload", downloader(db));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
