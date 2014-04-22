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


    describe('when adding an item to the wishlist', function(){
        it('should report existance of the item', function(){
            var product = { id: 5 };
            
        });
    })
});
