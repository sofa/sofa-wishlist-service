/* global store */
angular.module('sofa.wishlistService', [
    // TODO: Investigate. I'm not sold this should be handled on this level.
    store.enabled ? 'sofa.storages.localStorageService' : 'sofa.storages.memoryStorageService'
])

.factory('wishlistService', function (storageService) {

    'use strict';

    return new sofa.WishlistService(storageService);
});
