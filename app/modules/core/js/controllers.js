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