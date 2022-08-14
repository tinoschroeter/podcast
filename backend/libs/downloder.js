const { fileExist, downlod } = require("./utils.js");

const downloader = (db) => {
  return (req, res) => {
    const id = req.body.id;

    const result = db.prepare("select * from podcast").all();

    if (fileExist(id, db)) {
      return res.render("index", { message: "ist schon da", result });
    }
    downlod(id, db);
    res.render("index", { message: "Ok", result });
  };
};

module.exports = downloader;
