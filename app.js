const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");

app.use(express.static(__dirname + "/public"));

app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
  })
);

app.set("view engine", "hbs");

app.set("views", "./views");

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home");
});

const MyProfileRouter = require("./routes/MyProfile");
const MyPostsRouter = require("./routes/MyPosts");
const ForumPostsRouter = require("./routes/ForumPosts");
const FAQRouter = require("./routes/FAQ");
const RegisterRouter = require("./routes/Register");
const logoutRouter = require("./routes/logout");
const logoutConfirmationRouter = require("./routes/logoutConfirmation");
const loginRouter = require("./routes/login");
const successfulRegisterRouter = require("./routes/successfulRegister");

app.use("/MyProfile", MyProfileRouter);
app.use("/MyPosts", MyPostsRouter);
app.use("/ForumPosts", ForumPostsRouter);
app.use("/FAQ", FAQRouter);
app.use("/Register", RegisterRouter);
app.use("/logout", logoutRouter);
app.use("/logoutConfirmation", logoutConfirmationRouter);
app.use("/login", loginRouter);
app.use("/successfulRegister", successfulRegisterRouter);

app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
