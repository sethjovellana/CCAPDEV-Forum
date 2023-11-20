require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.engine(
  "handlebars",
  exphbs.engine({
    extname: "handlebars",
  })
);

app.set("view engine", "handlebars");

app.set("views", "./views");

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

const homeRouter = require("./routes/home")
const MyProfileRouter = require("./routes/MyProfile");
const MyPostsRouter = require("./routes/MyPosts");
const ForumPostsRouter = require("./routes/ForumPosts");
const FAQRouter = require("./routes/FAQ");
const RegisterRouter = require("./routes/Register");
const logoutRouter = require("./routes/logout");
const logoutConfirmationRouter = require("./routes/logoutConfirmation");
const loginRouter = require("./routes/login");
const successfulRegisterRouter = require("./routes/successfulRegister");
const AddPostRouter = require("./routes/AddPost");

app.use("/home", homeRouter);
app.use("/MyProfile", MyProfileRouter);
app.use("/MyPosts", MyPostsRouter);
app.use("/ForumPosts", ForumPostsRouter);
app.use("/FAQ", FAQRouter);
app.use("/Register", RegisterRouter);
app.use("/logout", logoutRouter);
app.use("/logoutConfirmation", logoutConfirmationRouter);
app.use("/login", loginRouter);
app.use("/successfulRegister", successfulRegisterRouter);
app.use("/AddPost", AddPostRouter);

// !important make sure to app.use Routers
app.use(RegisterRouter);
app.use(ForumPostsRouter);
app.use(MyPostsRouter);


app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
  mongoose.connect(process.env.MONGODB_URI, { dbname: process.env.DB_NAME }).then(() => {
    console.log(process.env.DB_NAME + " db"+ " connected");
  });
});
