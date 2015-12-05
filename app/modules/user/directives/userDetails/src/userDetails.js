(function(angular){

  var app = angular.module('my-app.user.details');

  app.directive('userDetails', [function userDetails() {
    return {
      restrict: 'EA',
      scope: {
        userId: '@'
      },
      controller: 'UserDetailsController',
      templateUrl: 'user.userDetails'
    }

  }]);
}(window.angular));
