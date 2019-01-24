const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";
const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("routes : wikis", () => {

  beforeEach((done) => {
  this.user;
  this.wiki;
  sequelize.sync({force: true}).then((res) => {

  User.create({
    name: "Liz",
    email: "liz@email.com",
    password: "test123"
    })
    .then((user) => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          role: user.role,
          userId: user.id,
          email: user.email
        }
      }, (err, res, body) => {
        done();
      });
      this.user = user;
   Wiki.create({
     title: "Dogs",
     body: "Bully breeds are my favorite",
     private: false,
     userId: this.user.id
   })
    .then((wiki) => {
      this.wiki = wiki;
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });
});
});

  describe("GET /wikis", () => {

    it("should return a status code 200 and all wikis", (done) => {
       request.get(base, (err, res, body) => {
         expect(res.statusCode).toBe(200);
         expect(err).toBeNull();
         expect(body).toContain("Wikis");
         expect(body).toContain("Dogs");
         done();
       });
     });
   });

});
