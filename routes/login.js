
// const express = require("express");
// const session = require("express-session");
// const router = express.Router();
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const { User } = require("../models/forum.js");

// router.use(bodyParser.json());

// router.use(
//   session({
//     secret: "your-secret-key", // Change this to a secure secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: { httpOnly: true, maxAge: oneDay },
//   })
// );

// router.get("/", (req, res) => {
//   res.render("login", { error: req.session.error }); // Pass the error to the view
//   req.session.error = false; // Reset error after rendering the view
// });

// router.post("/", async (req, res) => {
//   try {
//     const { user_name, password } = req.body;

//     const userMatch = await User.findOne({ user_name }).then(user => {
//       console.log(userMatch);
//       if (user==null){
//         return false;
//       }else {
//         return true;
//       }
//     });
// console.log(userMatch);
    
//     if (userMatch==false) {
//       req.session.error = true;
//       return res.render("login");
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password).then(password => {
//       console.log(password);
//       if (password==null){
//         return false;
//       }else {
//         return true;
//       }
//     });

//     if (passwordMatch==false) {
//       req.session.error = true;
//       return res.render("login");
//     }

//   // If the credentials are valid, set the user as authenticated in the session
//     if(userMatch && passwordMatch){
//        req.session.user = {
//       email: user.email,
//       full_name: user.full_name,
//       user_name: user.user_name,
//       // Add other relevant user data as needed
//       res.redirect(`/home?user_name=${user.user_name}&email=${user.email}`);
//        };  
//     }
      
    
    
//   } catch (error) {
//     console.error(error);
//     req.session.error = true;
//     res.render("login");
//     // res.status(500).json({ error: "Login failed" }); // Consider rendering an error page or redirecting with an error message
//   }
// });

// module.exports = router;
