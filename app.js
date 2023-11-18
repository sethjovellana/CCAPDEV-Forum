const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");

app.use(express.static(__dirname + "/public"));

app.engine(
  "hbs",
  exphbs.engine({
    // partialsDir: __dirname + '/views/partials/',
    extname: "hbs",
  })
);

app.set("view engine", "hbs");

app.set("views", "./views");

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("index");
});

const MyProfileRouter = require('./routes/MyProfile');
const MyPostsRouter = require('./routes/MyPosts');
const ForumPostsRouter = require('./routes/ForumPosts');
const FAQRouter = require('./routes/FAQ');

app.use('/MyProfile', MyProfileRouter);
app.use('/MyPosts', MyPostsRouter);
app.use('/ForumPosts', ForumPostsRouter);
app.use('/FAQ', FAQRouter);

app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
    