const { fileExist, downlod } = require("./utils.js");
const chalk = require("chalk");
const key = process.env.KEY || "foobar";

const downloader = (db) => {
  return (req, res) => {
    const { id, pw } = req.body;

    if (!id || !pw)
      return res.status(400).send("youtube id or password is missing!");
    if (pw !== key) return res.status(403).send("password is wrong!");

    const result = db.prepare("select * from podcast").all();

    if (fileExist(id, db)) {
      return res.send(chalk.bold("ist schon da\n"));
    }
    downlod(id, db);
    res.send(chalk.bold("ok\n"));
  };
};

module.exports = downloader;
