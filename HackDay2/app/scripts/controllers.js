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

.controller('DashCtrl', function() {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function() {
});
