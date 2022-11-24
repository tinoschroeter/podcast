var fs = require("fs");
const folder = process.env.FOLDER || "./video/";

const deleteItem = (db) => {
  return (req, res) => {
    const { id } = req.body;
    if (id) {
      const del = db
        .prepare("SELECT * FROM podcast WHERE youtubeID = ?")
        .get(id);

      if (!del) return res.status(400).send(`File with id: ${id} not exist\n`);

      const result = db
        .prepare("DELETE FROM podcast WHERE youtubeID = ?")
        .run(id);

      try {
        fs.unlinkSync(folder + del.file + ".mp3");
        fs.unlinkSync(folder + del.file + ".jpg");
      } catch (err) {
        console.error(err);
      }
      return res.send(`file deleted: ${del.title}\n`);
    }
    res.status(400).send("error\n");
  };
};

module.exports = deleteItem;
