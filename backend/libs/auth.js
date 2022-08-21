const login = () => {
  return (req, res) => {
    req.session.regenerate((err) => {
      const { user, passsword } = req.body;
      if (!user === "admin" && !password === "admin") {
        return res.redirect("/login");
      }

      if (err) return res.status(500).end();

      req.session.user = req.body.user;
      req.session.save((err) => {
        if (err) return res.status(500).end();
        res.redirect("/");
      });
    });
  };
};

const logout = () => {
  return (req, res) => {
    req.session.user = null;
    req.session.save((err) => {
      if (err) next(err);
      res.redirect("/login");
    });
  };
};

module.exports = { login, logout };
