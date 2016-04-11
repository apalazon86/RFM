RFM.controller('PanelController', function(){
  $scope.tab = 1;

  $scope.selectTab = function(setTab){
    $scope.tab = setTab;
    console.log(setTab);
  };

  $scope.isSelected = function(checkTab){
    return $scope.tab === checkTab;
  };
});
