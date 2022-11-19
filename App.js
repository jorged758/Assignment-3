const express = require("express");
const body_parser = require("body-parser");

const DB_Connection = require("./Connection/index");

const BlogRoutes = require(`./routes/blog`);

const path = require("path");

const BlogSchema = require("./models/blog");

const app = express();
app.use(body_parser.urlencoded({ extended: true }));
// To get form data payload in json format
app.use(body_parser.json());
// public images folder and join their path
app.use("/public/images", express.static(path.join("public", "images")));
// To clarify the views will be ejs based
app.set("view engine", "ejs");
// DB_Connection variable is mongoose instance whic runs project, if successfully connected to db on port 5000
DB_Connection.on("connected", function () {
  app.listen(5000);
});
// Error message handler
DB_Connection.on("error", function (err) {
  console.log("DB Connection Error: " + err.message);
});
// Allows all access controls and methods to submit form wit any method
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

app.get(`/`, async (req, res, next) => {
  let blogs = await BlogSchema.find({});
  res.render("Pages/homepage/index", { blogs: blogs });
});
// prepending the blog crud routes with the /blog and defines the blog routes
app.use("/blog", BlogRoutes);
