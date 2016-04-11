//Controlador de ofertas
RFM.controller('OffersController',['$scope', '$http', function($scope, $http){

  $scope.offersList=[];

  //Obtenemos el listado de ofertas
  $http.get('/offers').success(function(data){
    $scope.offersList=data;
  });

}]);
