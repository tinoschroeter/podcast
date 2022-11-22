const chalk = require("chalk");

const help = (req, res) => {
  //res.writeHead(200, { "Content-Type": "text/plain" });
  res.send(
    chalk.blue(
      `curl -X POST -H 'Content-Type: application/json' -d '{ "id": "raez6ELTojw", "pw": "password" }' ${req.hostname}/upload\n`
    )
  );
};

module.exports = help;
