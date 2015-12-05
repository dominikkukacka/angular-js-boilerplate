(function(angular) {

  var app = angular.module('my-app', [
    'ngRoute',
    'my-app.user'
  ]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/patients', {
        templateUrl: 'pages/patientList.html'
      })
      .when('/patients/create', {
        templateUrl: 'pages/patientCreate.html'
      })
      .when('/patients/:patientId', {
        templateUrl: 'pages/patientDetails.html'
      })
      .when('/patients/:patientId/edit', {
        templateUrl: 'pages/patientEdit.html'
      })
      .otherwise({
        templateUrl: 'pages/index.html'
      });
  }]);

  // we need this to inject the routeparams in every template
  app.run(['$rootScope', function($scope){
    $scope.$on('$routeChangeStart', function(next, current) {
      $scope.$$routeParams = current.params
   });
  }]);

})(window.angular);
