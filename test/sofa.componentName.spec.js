'use strict';
/* global sofa */

describe('sofa.componentName', function () {

    var componentName;

    beforeEach(function () {
        componentName = new sofa.ComponentName();
    });

    it('should be defined', function () {
        expect(componentName).toBeDefined();
    });
});
