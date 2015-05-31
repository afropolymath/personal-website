angular.module('core', ['core.controllers', 'core.services']);

// Main application configuration
var app = angular.module("PersonalSite", [
  'angularFileUpload',
  'firebase',
  'ui.router',
  'ui.bootstrap',
  'ngtimeago',
  'core']);

app.factory('CoreNavService', ['$http', function($http){
  return {
    getTweets: function(cb) {
      $http.get('/tweets')
      .success(function(tweets) {
        cb(tweets);
      });
    }
  };
}]);

app.controller('CoreNavController', ['$scope', '$location', '$timeout', '$anchorScroll', 'CoreNavService', function($scope, $location, $timeout, $anchorScroll, CoreNavService) {
  var inverse = false;
  
  var index = 0;
  
  CoreNavService.getTweets(function(tweets) {
    $scope.tweets = tweets;
    $scope.selectedTweet = $scope.tweets[index];
    setInterval(function() {
      index ++;
      if(index >= 10)
        index = 0;
      $timeout(function() {
        $scope.selectedTweet = $scope.tweets[index];
      });
    }, 10000);
  });

  $scope.goToDiv = function(id) {
    $(window).scrollTo('#' + id, 800);
  };

  $(window).scroll(function() {
    if(inverse) {
      if($(window).scrollTop() <= 70) {
        inverse = false;
        $('#home-section header').removeClass('fixed');
      }
    } else {
      if($(window).scrollTop() > 70) {
        inverse = true;
        $('#home-section header').addClass('fixed');
      }
    }
  });
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url:'/',
    templateUrl:'partials/core/views/index.html',
    controller: 'CoreHomeController'
  });
  $urlRouterProvider.otherwise('/');
}]);
app.factory('Refs', ['$firebase', function($firebase){
  var siteRef = "http://siteRef.firebase.io";
  return {
    siteRef: siteRef
  };
}]);
angular.module('blogs.controllers', [])

.controller('UsersHomeController', ['$scope', function($scope) {

}]);


angular.module('core.controllers', [])
.controller('CoreHomeController', ['$scope', '$timeout', 'CoreHomeService', function($scope, $timeout, CoreHomeService) {
  $scope.loading = false;
  $scope.skills = [
    {
      name: "JavaScript",
      value: 70
    },
    {
      name: "AngularJS",
      value: 80
    },
    {
      name: "NodeJS",
      value: 60
    },
    {
      name: "PHP",
      value: 90
    },
    {
      name: "CSS",
      value: 95
    },
    {
      name: "UI Design",
      value: 70
    },
    {
      name: "Java",
      value: 60
    },
    {
      name: "Mobile Application Dev.",
      value: 70
    }
  ];
  $scope.sendMessage = function() {
    $scope.loading = true;
    $scope.loadingMessage = "Give it a minute. Sending your message...";
    CoreHomeService.sendMessage($scope.inquiry, function(err) {
      if(!err) {
        $timeout(function() {
          $scope.inquiry = {};
        });
        toastr.success("Your message has been sent");
        $scope.loading = false;
      }
    });
  };
}]);
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