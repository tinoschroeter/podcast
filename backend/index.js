const express = require("express");
const app = express();

const YoutubeDlWrap = require("youtube-dl-wrap");
const youtubeDlWrap = new YoutubeDlWrap("/usr/bin/youtube-dl");

const folder = "./video/";

app.get("/upload/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    downlod(id);
  }
  res.send("Ok");
});

function downlod(id) {
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
      `${folder}%(title)s.%(ext)s`,
      "--print-json",
      `https://www.youtube.com/watch?v=${id}`,
    ])
    .then((out) => {
      const result = JSON.parse(out);
      console.log(result.title + ".mp3");
    });
}

app.listen(3000);
