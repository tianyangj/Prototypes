'use strict';
angular.module('HackDay2.controllers', [])

.controller('AppCtrl', function($scope, $auth, $ionicModal) {
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };
  $ionicModal.fromTemplateUrl('templates/modal-signin.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
})

.controller('HomeCtrl', function($scope, $http) {
  $http.get('http://192.168.200.120/api/merchandising/getdisplays?ids=games')
  .then(function(response) {
    var heros = _.find(response.data.groups, { name: 'HeroItems' });
    var featureds = _.find(response.data.groups, { name: 'FeaturedProducts' });
    $scope.heros = heros.items.map(function(item) {
      return item.product.design.displays[0];
    });
    $scope.heroIndex = 0;
    $scope.featureds = featureds.items.map(function(item) {
      return response.data.products[item.product.productVariantId];
    });
    console.log($scope)
  });
})

.controller('StoreCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function() {
})

.controller('CartCtrl', function() {
});
