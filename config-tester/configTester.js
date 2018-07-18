(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.configTester = factory());
}(this, (function () { 'use strict';

    function configTester(element, settings) {
        var configTester = {
            element: element,
            settings: settings
        };

        layout.call(configTester);

        return configTester;
    }

    return configTester;

})));
