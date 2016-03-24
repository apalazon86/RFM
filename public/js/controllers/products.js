(function(){
		angular.module('RFM', [ ])
		.controller('ProductsController',['$http',function($http){
		var products=this;
		products.productsList=[];
		$http.get('/products').success(function(data){
			console.log(data);
			products.productsList=data;
		});
	}]);
})();

