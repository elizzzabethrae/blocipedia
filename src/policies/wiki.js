
const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

     _isOwner() {
       return this.record && (this.record.userId == this.user.id);
     }

     _isAdmin() {
       return this.user && this.user.role == 2;
     }

     _isStandard() {
        return this.user && this.user.role == 0;
      }

      _isPremium() {
        return this.user && this.user.role == 1;
      }

     new() {
       return this.user != null;
     }

     create() {
       return this.new();
     }

     createPrivate() {
       return this.newPrivate();
     }

     show() {
       return true;
     }

     edit() {
       return true;
      }

     update() {
       return this.edit();
     }

     destroy() {
       return this._isAdmin() || this._isOwner();
     }

   }
