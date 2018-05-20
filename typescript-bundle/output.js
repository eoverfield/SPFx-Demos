System.register("ListService", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MockListsService;
    return {
        setters: [],
        execute: function () {
            MockListsService = /** @class */ (function () {
                function MockListsService() {
                }
                MockListsService.prototype.getListNames = function () {
                    return ["list 1", "list 2"];
                };
                return MockListsService;
            }());
            exports_1("MockListsService", MockListsService);
        }
    };
});
System.register("OurWebpart", ["ListService"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var ListService, dataService, y;
    return {
        setters: [
            function (ListService_1) {
                ListService = ListService_1;
            }
        ],
        execute: function () {
            dataService = new ListService.MockListsService();
            y = dataService.getListNames();
            console.log("Modules: " + y);
        }
    };
});
