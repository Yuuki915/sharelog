const router = require("express").Router();
const passport = require("passport");

const User = require("../models/User");

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.post("/auth/register", async (req, res) => {
  try {
    const registerUser = await User.register(
      { username: req.body.username },
      req.body.password
    );
    if (registerUser) {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/blogs");
      });
    } else {
      res.redirect("/register");
    }
  } catch (err) {
    res.send(err);
  }
});

router.post("/auth/login", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/blogs");
      });
    }
  });
});

router.get("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;

//
//
//

// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// router.use("/auth", User);

// router.get("/login", (req, res) => {
//   let sess = req.session;

//   if (sess.email) {
//     return res.redirect("/api/admin");
//   }
//   res.render("login");
// });

// router.post("/login", (req, res) => {
//   const { username, email, password } = req.body;

//   User.find(username)
//     .then((user) => {
//       if (user) {
//         if (
//           bcrypt.compareSync(email, user.email) &&
//           bcrypt.compareSync(password, user.password)
//         ) {
//           req.session.username = username;
//           res.end("logged in");
//         } else {
//           res.end("Invalid credentials");
//         }
//       } else {
//         res.end("No user found");
//       }
//     })
//     .catch((err) => {
//       res.end(err.message);
//     });
// });

// router.get("/register", (req, res) => {
//   let sess = req.session;
//   if (sess.email) {
//     return res.redirect("/api/admin");
//   }
//   res.render("register");
// });

// router.post("/register", (req, res) => {
//   const { email, password } = req.body;

//   const passwordHash = bcrypt.hashSync(password, 10);

//   const user = new User(email, passwordHash);
//   user
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.end("Registered");
//     })
//     .catch((err) => {
//       res.end(err.message);
//     });
// });

// // router.get("/admin", (req, res) => {
// //   const { email } = req.session;
// //   if (email) {
// //     res.write(`<h1>Hello ${email}</h1>`);
// //     res.end();
// //   } else {
// //     res.end("Login first");
// //   }
// // });

// router.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return console.error(err);
//     }
//     res.redirect("/api/login");
//   });
// });

// module.exports = router;
