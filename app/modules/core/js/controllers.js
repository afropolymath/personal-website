angular.module('core.controllers', [])
.controller('CoreHomeController', ['$scope', '$timeout', 'CoreHomeService', function($scope, $timeout, CoreHomeService) {
  $scope.selectedSection = 'build';
  $scope.loading = false;
  $scope.skills = [
    { icon: "mdi-language-python", name: "Python", value: 70 },
    { icon: "mdi-language-javascript", name: "JavaScript + NodeJS", value: 80 },
    { icon: "mdi-language-javascript", name: "AngularJS", value: 80 },
    { icon: "mdi-language-php", name: "PHP", value: 90 },
    { icon: "mdi-language-css3", name: "CSS", value: 95 },
    { icon: "mdi-language-html5", name: "UI Design", value: 70 },
    { icon: "mdi-code-braces", name: "Java", value: 60 },
    { icon: "mdi-android", name: "Mobile Application Dev.", value: 70 }
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
