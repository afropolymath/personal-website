angular.module('core', ['core.controllers', 'core.services']);

// Main application configuration
var app = angular.module("PersonalSite", [
  'angularFileUpload',
  'firebase',
  'ui.router',
  'ui.bootstrap',
  'ngtimeago',
  'ngSanitize',
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

app.filter('htmlLinky', function($sanitize, linkyFilter) {
  var ELEMENT_NODE = 1;
  var TEXT_NODE = 3;
  var linkifiedDOM = document.createElement('div');
  var inputDOM = document.createElement('div');

  var linkify = function linkify(startNode) {
    var i, ii, currentNode;

    for (i = 0, ii = startNode.childNodes.length; i < ii; i++) {
      currentNode = startNode.childNodes[i];

      switch (currentNode.nodeType) {
        case ELEMENT_NODE:
          linkify(currentNode);
          break;
        case TEXT_NODE:
          linkifiedDOM.innerHTML = linkyFilter(currentNode.textContent);
          i += linkifiedDOM.childNodes.length - 1
          while(linkifiedDOM.childNodes.length) {
            startNode.insertBefore(linkifiedDOM.childNodes[0], currentNode);
          }
          startNode.removeChild(currentNode);
      }
    }

    return startNode;
  };

  return function(input) {
    inputDOM.innerHTML = input;
    return linkify(inputDOM).innerHTML;
  };
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url:'/',
    templateUrl:'partials/core/views/index.html',
    controller: 'CoreHomeController'
  });
  $urlRouterProvider.otherwise('/');
}]);
