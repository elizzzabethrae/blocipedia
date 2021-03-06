const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");
const markdown = require( "markdown" ).markdown;
const Collaborator = require("../db/models").Collaborator;


module.exports = {

  index(req, res, next){
    wikiQueries.getAllWikis((err, wikis) => {
      if(err){
        console.log(err);
        res.redirect(500, "static/index");
      } else {
        res.render("wikis/index", {wikis});
      }
    })
  },


  new(req, res, next){
    const authorized = new Authorizer(req.user).new();
    if(authorized) {
      res.render("wikis/new");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/wikis");
    }
  },

  create(req, res, next){
    const authorized = new Authorizer(req.user).create();
    if(authorized) {
      let newWiki = {
        title: (req.body.title),
        body: (req.body.body),
        userId: req.user.id
      }
      if (req.body.private) {
        newWiki.private = true;
      }
      wikiQueries.addWiki(newWiki, (err, wiki) => {
        if(err){
          console.log("ERROR:", err);
          res.redirect(500, "/wikis/new");
        } else {
          res.redirect(303, `/wikis/${wiki.id}`);
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/wikis");
    }
  },

  show(req, res, next){
    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if(err || wiki == null){
        res.redirect(404, "/wikis");
      } else {
        res.render("wikis/show", {wiki, markdown});
      }
    });
  },

  destroy(req, res, next){
    const authorized = new Authorizer(req.user).destroy();
    console.log(authorized);
    if(authorized) {
      wikiQueries.deleteWiki(req.params.id, (err, wiki) => {
        if(err){
          console.log(err);
          res.redirect(500, `/wikis/${wiki.id}`)
        } else {
          res.redirect(303, "/wikis")
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect(`/wikis/${req.params.id}/`);
    }
  },

  edit(req, res, next){
    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if(err || wiki == null){
        res.redirect(404, "/");
      } else {
        console.log(err);
        res.render("wikis/edit", {wiki});
      }
    });
  },


//   isCollaborator((nonCollaboMember, collaboMember) => {
//       const authorized = new Authorizer(nonCollaboMember, wikis, collaboMember).showPrivate();
//       if(authorized){
//           res.render("wikis/privateWiki", {wikis});
//        } else {
//           req.flash("notice", "You are not authorized to do that.");
//           res.redirect("/wikis");
//       }
//    });
// }
// })
// },

update(req, res, next){
      wikiQueries.updateWiki(req.params.id, req.body, (err, wiki) => {
        if(err || wiki == null){
          res.redirect(401, `/wikis/${req.params.id}/edit`);
        } else {
          res.redirect(`/wikis/${req.params.id}`);
        }
      });
    }
}
