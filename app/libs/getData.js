const getData = (db) => {
  return (req, res) => {
    let result = db.prepare("select * from podcast").all();

    if (result.length === 0) result.push({ title: "no uploads", file: "nope" });
    res.render("index", { result });
  };
};

module.exports = getData;
