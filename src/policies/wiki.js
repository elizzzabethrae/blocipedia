// #1
const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

// #2

 create() {
   return this.new();
 }

// #3

 update() {
   return this.edit();
 }

 destroy() {
   return this.update();
 }
}
