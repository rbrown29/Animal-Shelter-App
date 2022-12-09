console.log('connected')
const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){
	const controller = this;
	this.indexOfEditFormToShow = null;
	this.loggedInUser = false;

	this.signUp = function() {
       
        $http({
            url: '/users',
            method: 'POST',
            data: {
                username: this.signUpUsername,
                password: this.signUpPassword
            }
        }).then(function(response){
            controller.loggedInUser = response.data
            console.log(response.data)
        })
    }

    this.login = function(){
        $http({
            url:'/session',
            method:'POST',
            data: {
                username: this.loginUsername,
                password: this.loginPassword
            }
        }).then(function(response){
            if(response.data.username){
                controller.loggedInUser = response.data;
            } else {
                controller.loginUsername = null;
                controller.loginPassword = null;
            }
        })
    }

    this.logout = function(){
        $http({
            url:'/session',
            method:'DELETE'
        }).then(function(){
            controller.loggedInUser = false;
        })
    }

	this.deleteAnimal = function(animal) {
		$http({
			method: 'DELETE',
			url: '/animals/' + animal._id
		}).then(function(response) {
			controller.getAnimals()
		})
	}

	this.editAnimal = function(animal) {
		$http({
			method: 'PUT',
			url: '/animals/' + animal._id,
			data: {
				name: this.updatedName,
  				species: this.updatedSpecies,
  				breed: this.updatedBreed,
  				sex: this.updatedSex,
  				image: this.updatedImage,
  				age: this.updatedAge,
  				adopted: this.updatedAdopted
			}
		}).then(function(response) {
			controller.getAnimals()
			controller.indexOfEditFormToShow = null
		})
	}
	this.toggleAnimalAdopted = function(animal) {
		let newAdoptedValue
		if (animal.adopted === true) {
			newAdoptedValue = false
		} else {
			newAdoptedValue = true
		}
		$http({
			method: 'PUT',
			url: '/animals/' + animal._id,
			data: {
				name: animal.name,
  				species: animal.species,
  				breed: animal.breed,
  				sex: animal.sex,
  				image: animal.image,
  				age: animal.age,
  				adopted: newAdoptedValue
			}

		}).then(function(response) {
			controller.getAnimals()
		})
	}

	this.createAnimal = function(){
        $http({
                method:'POST',
                url:'/animals',
                data: {
                    name: this.name,
  					species: this.species,
  					breed: this.breed,
  					sex: this.sex,
  					image: this.image,
  					age: this.age,
  					adopted: this.adopted
                }
        }).then(function(response){
        	console.log(response)
            controller.getAnimals()
        }, function(error){
            console.log(error);
        })
    }
    this.getAnimals = function() {
    	$http({
    		method: 'GET',
    		url: '/animals'
    	}).then(function(response) {
        controller.animals = response.data;
    	})
    }
    this.getAnimals()

    $http({
        method:'GET',
        url:'/session'
    }).then(function(response){
        if(response.data.username){
            controller.loggedInUser = response.data;
        }
    })
}])

$('a[data-modal]').click(function(event) {
	$(this).modal();
	return false;
  });