'use strict';
/* global sofa */

describe('sofa.wishlistService', function () {

    var componentName;

    beforeEach(function () {
        componentName = new sofa.WishlistService();
    });

    it('should be defined', function () {
        expect(componentName).toBeDefined();
    });
});
