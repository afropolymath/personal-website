angular.module('core.services', [])
.factory('CoreHomeService', ['$http', function($http){
  return {
    sendMessage: function(inquiry, cb) {
      $http.post('/inquire', inquiry)
        .success(function(data) {
          cb();
        });
    }
  };
}]);