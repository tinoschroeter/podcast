const chalk = require("chalk");

const help = (req, res) => {
  //res.writeHead(200, { "Content-Type": "text/plain" });
  res.send(
    chalk.bold(
      `Usage: ${req.hostname}/uload\n\n` +
      `C: curl -X POST -H 'Content-Type: application/json' -d '{ "id": "raez6ELTojw", "pw": "password" }' ${req.hostname}/upload\n` +
      `R: curl ${req.hostname}/upload/list\n` +
      `U: curl -X PUT -H 'Content-Type: application/json' -d '{ "id": "raez6ELTojw", "pw": "password", "title": "new title" }' ${req.hostname}/upload\n` +
      `D: curl -X DELETE -H 'Content-Type: application/json' -d '{ "id": "raez6ELTojw", "pw": "password" }' ${req.hostname}/upload\n`
    )
  );
};

module.exports = help;
