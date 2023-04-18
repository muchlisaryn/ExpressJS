const expres = require("express");
const path = require("path");
const app = expres();
const productRouterV1 = require("./app/v1/product/routes");
const productRouterV2 = require("./app/v2/product/routes");
const logger = require("morgan");

app.use(logger("dev"));
app.use(expres.json());
app.use(expres.urlencoded({ extended: true }));
app.use("/public", expres.static(path.join(__dirname, "uploads")));
app.use("/api/v1", productRouterV1);
app.use("/api/v2", productRouterV2);
app.use((req, res, next) => {
  res.status(404);
  res.json({
    status: "failed",
    message: "Resource" + req.originalUrl + "Not Found",
  });
});
app.listen(3000, () => console.log("server: http://localhost:3000"));
