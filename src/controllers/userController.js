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


   upgrade(req, res, next){
     User.findById(req.params.id)
     .then(user => {
       res.render('users/upgrade', {user});
     })
     .catch(err => {
       req.flash("error", err);
       res.redirect("/");
     })
   },

   downgrade(req, res, next){
     res.render("users/downgrade");
   },

   downgradeForm(req, res, next){
      let newDowngrade = {
         name: req.body.name, //form not sending body
         email: req.body.email,
         description: req.body.description
       };

       User.findById(req.params.id)
       .then(user => {
         user.role = 0;
         user.save();

         req.flash("notice", "You are now a standard user!");
         res.redirect("/");

       sgMail.setApiKey(process.env.SENDGRID_API_KEY);
       const msg = {
         to: 'elizebathewarners@gmail.com',
         from: 'test@example.com',
         subject:  'downgrade',
         text: 'refund their credit card',
         html: '<strong>refund their credit card</strong>',
       };
          console.log(process.env.SENDGRID_API_KEY)
          sgMail.send(msg).then( () => {
            console.log("Successfully Sent Mail!");
          })
          .catch( error => {
            console.error(error.toString());
          });

       userQueries.createDowngrade(newDowngrade, (err, user) => {
         if(err){
           req.flash("error", err);
           console.log(err);
           res.redirect("/");
         } else {

           passport.authenticate("local")(req, res, () => {
             req.flash("notice", "You've successfully Downgraded!");
             res.redirect("/");
           })
         }
       });

     })
   },

      charge(req, res, next){
          User.findById(req.params.id)
          .then(user => {
            console.log(user);
            var stripeToken = req.body.stripeToken;
            // Charge the user's card:
            stripe.charges.create({
              amount: 1500,
              currency: "usd",
              description: "Upgrade tp premium User",
              source: stripeToken,
            }, function(err, charge) {
              user.role = 1;
              user.save();

            req.flash("notice", "You are now a premium user!");
            res.redirect("/");
          });
        })
        .catch(err => {
          console.log(err);
          req.flash("notice", "Error upgrading.  Please try again.");
          res.redirect("/");
        });
      },
      
   signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   }
}
