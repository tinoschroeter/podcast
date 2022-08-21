const getData = (db) => {
  return (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const result = db.prepare("select * from podcast").all();
    res.render("index", { message: "", result });
  };
};

module.exports = getData;
