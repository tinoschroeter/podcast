const downloader = require("./libs/downloder.js");
const { login, logout } = require("./libs/auth.js");
const getData = require("./libs/getData.js");
const { setupDatabase } = require("./libs/utils.js");

const session = require("express-session");

const Database = require("better-sqlite3");
const dbFile = process.env.DBFILE || "./data.sql";
const db = new Database(dbFile);

const port = process.env.PORT || 3000;

const morgan = require("morgan");

const express = require("express");
const app = express();

setupDatabase(db);

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: true })
);

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", getData(db));
app.post("/", downloader(db));
app.get("/login", (req, res) => res.render("login"));
app.post("/login", login());
app.get("/logout", logout());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
