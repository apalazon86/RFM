RFM.controller('PanelController', function(){
  this.tab = 1;

  this.selectTab = function(setTab){
    this.tab = setTab;
    console.log(setTab);
  };

  this.isSelected = function(checkTab){
    return this.tab === checkTab;
  };
});
