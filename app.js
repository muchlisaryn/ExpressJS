const expres = require("express");
const path = require("path");
const app = expres();
const router = require("./routes");
const log = require("./middlewares/logger");

app.use(log);
app.use(expres.urlencoded({ extended: true }));
app.use("/public", expres.static(path.join(__dirname, "uploads")));
app.use(expres.json());
app.use(router);
app.use((req, res, next) => {
  res.status(404);
  res.json({
    status: "failed",
    message: "Resource" + req.originalUrl + "Not Found",
  });
});
app.listen(3000, () => console.log("server: http://localhost:3000"));
