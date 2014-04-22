'use strict';
/* global sofa */

describe('sofa.wishlistService', function () {

    var componentName;

    beforeEach(function () {
        componentName = new sofa.WishlistService(new sofa.MemoryStorageService());
    });

    it('should be defined', function () {
        expect(componentName).toBeDefined();
    });


    describe('when adding an item to the wishlist', function () {
        it('should report existance of the item', function () {
            var product = { urlKey: 'some-product' };

            expect(componentName.exists(product.urlKey)).toBeFalsy();
            componentName.addItem(product);
            expect(componentName.exists(product.urlKey)).toBeTruthy();
        });
    });
});
