"use strict";
exports.__esModule = true;
var MockListsService = /** @class */ (function () {
    function MockListsService() {
    }
    MockListsService.prototype.getListNames = function () {
        return ["list 1", "list 2"];
    };
    return MockListsService;
}());
exports.MockListsService = MockListsService;
