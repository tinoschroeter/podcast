const downloader = require("./libs/downloder.js");
const { setupDatabase } = require("./libs/utils.js");

const Database = require("better-sqlite3");
const dbFile = process.env.DBFILE || "./data.sql";
const db = new Database(dbFile);

const port = process.env.PORT || 3000;

const morgan = require("morgan");

const express = require("express");
const app = express();

setupDatabase(db);

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("index", { message: ""}));
app.post("/", downloader(db));

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
