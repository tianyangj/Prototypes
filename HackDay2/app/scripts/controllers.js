'use strict';
angular.module('HackDay2.controllers', [])

.controller('AppCtrl', function($scope, $auth, $ionicModal, $state) {
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider).then(function(response) {
      $scope.user = response.data.user;
      $scope.closeModal();
      $state.go('tab.account');
    });
  };
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
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

  $scope.cart = [];
})

.controller('HomeCtrl', function($scope, model) {
  $scope.heros = model.heros;
  $scope.featureds = model.featureds;
})

.controller('StoreCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('ProductCtrl', function($scope, $stateParams, $http) {
  $http({
    method: 'GET',
    cache: true,
    url: 'http://192.168.200.120/api/product/get/' + $stateParams.productId
  })
  .then(function(response){
    $scope.model = response.data;
  });
  $scope.addToCart = function(product) {
    $scope.cart.push(product);
  };
})

.controller('AccountCtrl', function($scope) {
  $scope.clear = function() {
    localStorage.clear();
  };
})

.controller('CartCtrl', function($scope, $ionicPopup) {
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;
  $scope.doEdit = function() {
    $scope.shouldShowDelete = !$scope.shouldShowDelete;
    $scope.shouldShowReorder = false;
  };
  $scope.doReorder = function() {
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = !$scope.shouldShowReorder;
  };
  $scope.deleteItem = function(item) {
    $scope.cart.splice($scope.cart.indexOf(item), 1);
  };
  $scope.reorderItem = function(item, fromIndex, toIndex) {
    $scope.cart.splice(fromIndex, 1);
    $scope.cart.splice(toIndex, 0, item);
  };
  $scope.share = function(item) {
    var confirmPopup = $ionicPopup.confirm({
     title: 'Share to Facebook',
     template: 'Are you sure you want to share ' + item.title + ' to Facebook?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
  };
});
