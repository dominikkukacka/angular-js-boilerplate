(function(angular) {

  var userModel = angular.module('my-app.models.user', []);

  userModel.service('UserModel', [function() {
    this.id = null;
    this.email = null;
    this.firstName = null;
    this.lastName = null;
    this.createdAt = null;
    this.modifiedAt = null;


    function __construct(user) {
      if (!!patient) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        if (!!user.createdAt) {
          this.createdAt = new Date(user.createdAt);
        }
        if (!!user.modifiedAt) {
          this.modifiedAt = new Date(user.modifiedAt);
        }
      }
    }
  }]);
}(window.angular));
