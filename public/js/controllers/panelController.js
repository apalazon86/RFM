RFM.controller('PanelController',['$scope',function($scope){ 
  $scope.tab = 1;

  $scope.selectTab = function(setTab){
    $scope.tab = setTab;
    console.log(setTab);
  };

  $scope.isSelected = function(checkTab){
    return $scope.tab === checkTab;
  };
}]);