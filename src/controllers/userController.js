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
     passport.authenticate("local")(req, res, () => {
      // console.log(req.user);
       if(!req.user){
         req.flash("notice", "Sign in failed. Please try again.")
         res.redirect("/users/sign_in");
       } else {
         req.flash("notice", "You've successfully signed in!");
         res.redirect("/");
       }
     })
   },

   upgradePage(req, res, next){
      res.render("users/upgrade");
    },

   upgrade (req, res, next){
     const stripe = require("stripe")("sk_test_UJwtSaMrtxRrCndqkQODGhuz");
     const token = req.body.stripeToken;
     const charge = stripe.charges.create({
       amount: 1500,
       currency: "usd",
       description: "Upgrade",
       source: token,
       statement_descriptor: 'Blocipedia Upgrade',
       capture: false,
     });
     userQueries.upgrade(req.params.id, (err, user) => {
       if(err && err.type ==="StripeCardError"){
         req.flash("notice", "Your payment was unsuccessful");
         res.redirect("/users/upgrade");
       } else{
         req.flash("notice", "Your payment via stripe was successful, you are now a Premium Member!");
         res.redirect(`/`);

       }
     }) ;
   },

   downgradePage(req, res, next) {
     res.render("users/downgrade");
   },

   downgrade(req, res, next){
     userQueries.downgrade(req.params.id, (err, user) => {
       if(err || user === null){
         req.flash("notice", "No user found with that ID");
         res.redirect("/users/downgrade");
       } else{
         req.flash("notice", "Your account has been reverted back to standard");
         res.redirect(`/`);
       }
     });
   },

   signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   }
}
