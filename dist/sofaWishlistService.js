/**
 * sofa-wishlist-service - v0.3.0 - Fri Feb 06 2015 16:36:54 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (sofa, document, undefined) {
'use strict';
/* global sofa */
/**
 * @sofadoc class
 * @name sofa.WishlistService
 * @package sofa-wishlist-service
 *
 * @requiresPackage sofa-core
 * @requiresPackage sofa-storages
 *
 * @distFile dist/sofa.WishlistService.js
 *
 * @description
 * `sofa.WishlistService` is the interface to interact with a wishlist. It provides
 * methods to add and remove items. It also takes care of writing
 * updates to an available storage service.
 */
sofa.define('sofa.WishlistService', function (storageService) {

    var self = {};

    var STORE_PREFIX = 'wishlist_';

    //allow this service to raise events
    sofa.observable.mixin(self);

    /**
     * @sofadoc method
     * @name sofa.WishlistService#getItems
     * @memberof sofa.WishlistService
     *
     * @description
     * Returns an object with key value pairs of the items
     *
     * @example
     * wishlistService.getItems();
     *
     * @return {object} the wishlist items.
     */
    self.getItems = function () {
        return sanitizeSavedData(storageService.get(STORE_PREFIX) || {});
    };

    /**
     * @sofadoc method
     * @name sofa.WishlistService#addItem
     * @memberof sofa.WishlistService
     *
     * @description
     * Adds an item to the wishlist. Returns the added wishlist item.
     *
     * @example
     * wishlistService.addItem(product, 1, variants.selectedVariant);
     *
     * @param {object} product The product object itself.
     * @param {number} quantity The number of times the product should be added.
     * @param {object} variant The variant the product should be added with.
     *
     * @return {object} The added wishlist item.
     */
    self.addItem = function (product, quantity, variant) {
        var key = product.urlKey  + (variant ? '/' + variant.variantID : ''),
            wishlist = self.getItems();

        if (wishlist[key]) {
            wishlist[key].quantity += quantity;
        }
        else {
            wishlist[key] = {
                product: product,
                key: key,
                quantity: quantity,
                variant: variant
            };
        }
        setWishlist(wishlist);
        return wishlist[key];
    };

    /**
     * @sofadoc method
     * @name sofa.WishlistService#removeItem
     * @memberof sofa.WishlistService
     *
     * @description
     * Removes an item from the wishlist.
     *
     * @example
     * wishlistService.removeItem(itemOrKey);
     *
     * @param {object | string} either the item or the key of the item to be removed
     */
    self.removeItem = function (itemOrKey) {
        var key = itemOrKey.key || itemOrKey,
            wishlist = self.getItems();
        delete (wishlist[key]);
        setWishlist(wishlist);
    };

    /**
     * @sofadoc method
     * @name sofa.WishlistService#getItemCount
     * @memberof sofa.WishlistService
     *
     * @description
     * Returns the amount of items that are currently on the wishlist.
     *
     * @example
     * wishlistService.getItemCount();
     *
     * @return {Number} The count of items.
     */
    self.getItemCount = function () {
        return Object.keys(self.getItems()).length;
    };

    /**
     * @sofadoc method
     * @name sofa.WishlistService#isEmpty
     * @memberof sofa.WishlistService
     *
     * @description
     * Returns true if the wishlist is empty and false if it holds items.
     *
     * @example
     * wishlistService.isEmpty()
     *
     * @return {Boolean} empty state
     */
    self.isEmpty = function () {
        return self.getItemCount() === 0;
    };

    /**
     * @sofadoc method
     * @name sofa.WishlistService#exists
     * @memberof sofa.WishlistService
     *
     * @description
     * Returns true if the item exists in the wishlist or false otherwise.
     *
     * @example
     * wishlistService.exists('some-product');
     *
     * @param {string} the productUrlKey (optionally with /variantId) to be checked for existance
     *
     * @return {Boolean} exists state
     */
    self.exists = function (productUrlKey) {
        var wishlist = self.getItems();
        return !sofa.Util.isUndefined(wishlist[productUrlKey]);
    };

    //http://mutablethought.com/2013/04/25/angular-js-ng-repeat-no-longer-allowing-duplicates/
    var sanitizeSavedData = function (wishlist) {
        if (!wishlist) {
            return wishlist;
        }

        for (var key in wishlist) {
            wishlist[key].product = sofa.Util.extend(new sofa.models.Product(), wishlist[key].product);
        }
        return wishlist;
    };

    var setWishlist = function (newWishlist) {
        storageService.set(STORE_PREFIX, newWishlist);
        self.emit('itemsUpdated', self, newWishlist);
    };

    return self;
});
}(sofa, document));
