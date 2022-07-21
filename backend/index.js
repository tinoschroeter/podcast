const Database = require("better-sqlite3");
const dbFile = process.env.DBFILE || "./data.sql";
const db = new Database(dbFile);

const uuid = require("uuid");
const morgan = require("morgan");

const express = require("express");
const app = express();

app.use(morgan("combined"));

const YoutubeDlWrap = require("youtube-dl-wrap");
const youtubeDlWrap = new YoutubeDlWrap("/usr/bin/youtube-dl");

const tableName = "podcast";
const fields =
  "(title text NOT NULL UNIQUE, youtubeID NOT NULL, thumbnail text, filesize text, channel text, tags text, categories text, description, file text)";
const query = `CREATE TABLE IF NOT EXISTS  ${tableName} ${fields}`;

db.prepare(query).run();

const folder = process.env.FOLDER || "./video/";

app.get("/upload/:id", (req, res) => {
  const id = req.params.id;

  if (fileExist(id)) {
    return res.send("ist schon da");
  }
  downlod(id);
  res.send("Ok");
});

function fileExist(youtubeID) {
  const result = db
    .prepare(`SELECT * FROM ${tableName} WHERE youtubeID=?`)
    .get(youtubeID);

  return result ? true : false;
}

function downlod(youtubeID) {
  const uuidV4 = uuid.v4();
  youtubeDlWrap
    .execPromise([
      "--prefer-ffmpeg",
      "--extract-audio",
      "--audio-format",
      "mp3",
      "--audio-quality",
      0,
      "--embed-thumbnail",
      "--output",
      `${folder}${uuidV4}.%(ext)s`,
      "--print-json",
      `https://www.youtube.com/watch?v=${youtubeID}`,
    ])
    .then((out) => {
      const result = JSON.parse(out);
      console.log("write data...");
      db.prepare(`INSERT INTO ${tableName} VALUES(?,?,?,?,?,?,?,?,?)`).run(
        result.title,
        youtubeID,
        result.thumbnail,
        result.filesize,
        result.channel,
        result.tags.toString(),
        result.categories.toString(),
        result.description,
        uuidV4
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

app.listen(3000, () => {
  console.log("Server is starting");
});
