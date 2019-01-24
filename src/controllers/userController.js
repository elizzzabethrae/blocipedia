
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
       email: req.body.email,
       password: req.body.password,
       passwordConfirmation: req.body.passwordConfirmation
     };


     userQueries.createUser(newUser, (err, user) => {
       if(err){
         req.flash("error", err);
         res.redirect("/users/signup");
       } else {

         passport.authenticate("local")(req, res, () => {
           req.flash("notice", "You've successfully signed in!");
           sgMail.setApiKey(process.env.SENDGRID_API_KEY);
           const msg = {
             to: 'elizabethwarners@gmail.com',
             from: 'test@example.com',
             subject: 'i love bread',
             text: 'especially homemade bread',
             html: '<strong>especially homemade bread</strong>',
           };
          sgMail.send(msg);
           res.redirect("/");
         })
       }
     });
     console.log(process.env.SENDGRID_API_KEY);
   },

  signInForm(req, res, next){
     res.render("users/sign_in");
   },

   signIn(req, res, next){
     passport.authenticate("local")(req, res, () => {
       console.log(err);
       console.log(req.user);
       if(err){
         req.flash("notice", "Sign in failed. Please try again.")
         res.redirect("/users/sign_in");
       } else {
         req.flash("notice", "You've successfully signed in!");
         res.redirect("/");
       }
     })
   },



   signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   }
}
