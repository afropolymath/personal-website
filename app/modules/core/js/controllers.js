angular.module('core.controllers', [])
.controller('CoreHomeController', ['$scope', '$timeout', 'CoreHomeService', function($scope, $timeout, CoreHomeService) {
  $scope.selectedSection = 'build';
  $scope.loading = false;
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
