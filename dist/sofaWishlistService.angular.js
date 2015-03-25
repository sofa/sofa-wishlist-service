/**
 * sofa-wishlist-service - v0.4.0 - Wed Mar 25 2015 14:42:36 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
/* global store */
angular.module('sofa.wishlistService', [
    // TODO: Investigate. I'm not sold this should be handled on this level.
    store.enabled ? 'sofa.storages.localStorageService' : 'sofa.storages.memoryStorageService'
])

.factory('wishlistService', ["storageService", function (storageService) {

    'use strict';

    return new sofa.WishlistService(storageService);
}]);
}(angular));
