const uuid = require("uuid");
const YoutubeDlWrap = require("youtube-dl-wrap");
const youtubeDlWrap = new YoutubeDlWrap("/usr/bin/youtube-dl");

const tableName = "podcast";
const folder = process.env.FOLDER || "./video/";

const fileExist = (youtubeID, db) => {
  console.log("fileExist id: ", youtubeID)
  const result = db
    .prepare(`SELECT * FROM ${tableName} WHERE youtubeID=?`)
    .get(youtubeID);

  return result ? true : false;
};

const downlod = (youtubeID, db) => {
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
};

const setupDatabase = (db) => {
  const fields =
    "(title text NOT NULL UNIQUE, youtubeID NOT NULL, thumbnail text, filesize text, channel text, tags text, categories text, description, file text)";
  const query = `CREATE TABLE IF NOT EXISTS  ${tableName} ${fields}`;

  db.prepare(query).run();
};

module.exports = { fileExist, downlod, setupDatabase };
