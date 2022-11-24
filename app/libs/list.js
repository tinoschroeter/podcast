const list = (db) => {
  return (req, res) => {
    const result = db.prepare("select * from podcast").all();
    let data = result
      .map((item) => `${item.youtubeID} | ${item.title}`)
      .join('\n');
    res.send("id | title\n" + data + "\n");
  };
};

module.exports = list;
