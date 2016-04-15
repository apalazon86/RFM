//Controlador de menú de registro de usuario
RFM.controller('RegisterController', ['$scope', '$http', '$location',
	function($scope, $http, $location){ 
	//Función de usuario
	$scope.register = function(){
		//Propiedades del usuario que se va a crear
		var registerData = {
			'username': $scope.username,
			'password': $scope.password,
			'fridge': $scope.fridge,
			'firstName': $scope.firstname,
			'secondName': $scope.secondname,
			'glutenAl': $scope.glutenal,
			'eggAl': $scope.eggnal,
			'milkAl': $scope.milkal,
			'nutsAl': $scope.nutsal,
			'fishAl': $scope.fishal,
			'shellFishAl': $scope.shellfishal
	    };
	    //Se crea el usuario
		$http.post('/users', registerData)
			.success(function(userData){
				//Se le lleva al menú de login
				$location.path('/login');
			})
			//Si se produce un error se avisa al usuario
			.error(function(){
				alert('No se ha podido registrar ese usuario');	
			});

	};
}]);