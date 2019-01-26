
const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');
const express = require('express');
const router = express.Router();

module.exports = {

  signUp(req, res, next){
    res.render("users/signup");
  },

  create(req, res, next){
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };

<<<<<<< HEAD
     userQueries.createUser(newUser, (err, user) => {
       if(err){
         req.flash("error", err);
         res.redirect("/users/signup");
       } else {
=======
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'elizabethwarners@gmail.com',
      from: 'test@example.com',
      subject: 'I love bread',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    console.log(process.env.SENDGRID_API_KEY)
    sgMail.send(msg);

    userQueries.createUser(newUser, (err, user) => {
      if(err){
        req.flash("error", err);
        res.redirect("/users/signup");
      } else {
>>>>>>> wiki-crud


        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        })
      }
    });
  },

  signInForm(req, res, next){
     res.render("users/sign_in");
   },

   signIn(req, res, next){
<<<<<<< HEAD
        passport.authenticate('local', function(err, user, info) {
             if (err) { return next(err); }
             if (!user) {
               req.flash("notice", "Login error. Did you enter the correct username and password?")
               return res.redirect("/users/sign_in");
             }
             req.flash("notice", "Login Success!");
             req.logIn(user, function(err) {
               if (err) { return next(err); }
               return res.redirect('/');
             });
           })(req, res, next);
      },
=======
     passport.authenticate("local")(req, res, () => {
       console.log(req.user);
       if(!req.user){
         req.flash("notice", "Sign in failed. Please try again.")
         res.redirect("/users/sign_in");
       } else {
         req.flash("notice", "You've successfully signed in!");
         res.redirect("/");
       }
     })
   },


>>>>>>> wiki-crud

   signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   }
}
