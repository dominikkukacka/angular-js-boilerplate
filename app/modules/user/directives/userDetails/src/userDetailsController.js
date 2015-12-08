(function(angular){

  var app = angular.module('my-app.user.details');

  app.controller('UserDetailsController', ['$scope', 'UserDAO', function($scope, UserDAO) {
      $scope.user = null;
      UserDAO.get(1).then(function(user) {
        $scope.user = user;
      }, function(err) {
        $scope.error = err.data;
      })
  }]);

}(window.angular));
