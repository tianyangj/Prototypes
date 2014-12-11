'use strict';
angular.module('HackDay2.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  };
})

.factory('homeSvc', function($http) {
  return {
            get: function() {
                return $http({
                    method: 'GET',
                    cache: true,
                    url: 'http://192.168.200.120/api/merchandising/getdisplays?ids=games'
                })
                    .then(function(response) {
                        var heros = _.find(response.data.groups, { name: 'HeroItems' });
                        var featureds = _.find(response.data.groups, { name: 'FeaturedProducts' });
                        return {
                            heros: heros.items.map(function(item) {
                                return item.product.design.displays[0];
                            }),
                            featureds: featureds.items.map(function(item) {
                                return response.data.products[item.product.productVariantId];
                            })
                        };
                    });
            }
        };
});
