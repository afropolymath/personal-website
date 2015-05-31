app.factory('Refs', ['$firebase', function($firebase){
  var siteRef = "http://siteRef.firebase.io";
  return {
    siteRef: siteRef
  };
}]);