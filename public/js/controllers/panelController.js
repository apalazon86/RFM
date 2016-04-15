//Controlador de paneles de receta
RFM.controller('PanelController',['$scope',function($scope){ 
  //Se inicializa el tab
  $scope.tab = 1;
  //Se cambia el tab
  $scope.selectTab = function(setTab){
    $scope.tab = setTab;
  };
  //Se comprueba si el tab actual es igual al seleccionado
  $scope.isSelected = function(checkTab){
    return $scope.tab === checkTab;
  };
  
}]);