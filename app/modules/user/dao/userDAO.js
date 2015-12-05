(function(angular) {

  var app = angular.module('my-app.user.dao', [
    'ngResource'
  ]);

  app.factory('UserDAO', ['$q', '$resource', function($q, $resource) {

    var User = $resource('/api/users/:userId', {userId:'@id'});

    return {
        get: function(id) {
          var deferred = $q.defer();

          User.get({userId:id}, function(data) {
            deferred.resolve(data);
          }, function(err) {
            deferred.reject(err);
          });

          return deferred.promise;
        }
    };
  }]);

}(window.angular));
