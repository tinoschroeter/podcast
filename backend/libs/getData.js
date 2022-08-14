const getData = (db) => {
  return (req, res) => {
    const result = db.prepare("select * from podcast").all();
    res.render("index", { message: "", result });
  };
};

module.exports = getData;
