const { fileExist, downlod } = require("./utils.js");

const downloader = (db) => {
  return (req, res) => {
    const id = req.body.id;

    if (fileExist(id, db)) {
      return res.render("index", { message: "ist schon da" });
    }
    downlod(id, db);
    res.render("index", { message: "Ok" });
  };
};

module.exports = downloader;
