(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MockListsService = function () {
    function MockListsService() {
        _classCallCheck(this, MockListsService);
    }

    _createClass(MockListsService, [{
        key: "getListNames",
        value: function getListNames() {
            return ["list 1", "list 2"];
        }
    }]);

    return MockListsService;
}();

exports.MockListsService = MockListsService;

},{}],2:[function(require,module,exports){
"use strict";

var ListService = require('./ListService');
var dataService = new ListService.MockListsService();
var y = dataService.getListNames();
console.log("Modules: " + y);

},{"./ListService":1}],3:[function(require,module,exports){
"use strict";

function add(x, y) {
    return x + y;
}
var myAddFunction = function myAddFunction(x, y) {
    return x + y;
};
console.log("add: " + add(1, 2));
console.log("myAddFunction: " + myAddFunction(10, 11));

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MockListsService = function () {
    function MockListsService() {
        _classCallCheck(this, MockListsService);
    }

    _createClass(MockListsService, [{
        key: "getListNames",
        value: function getListNames() {
            return ["list 1", "list 2"];
        }
    }, {
        key: "getListColumnNames",
        value: function getListColumnNames(listId) {
            if (listId === "one") {
                return ["column 1", "column 2"];
            } else {
                return ["column 3", "column 4"];
            }
        }
    }]);

    return MockListsService;
}();

var listService = new MockListsService();
console.log(listService.getListNames()); // string array: [“list 1”, “list 2”]
console.log(listService.getListColumnNames("two")); //string array [“column 3”, “column 4”]

},{}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;

    var LettersOnlyValidator = function () {
        function LettersOnlyValidator() {
            _classCallCheck(this, LettersOnlyValidator);
        }

        _createClass(LettersOnlyValidator, [{
            key: "isAcceptable",
            value: function isAcceptable(s) {
                return lettersRegexp.test(s);
            }
        }]);

        return LettersOnlyValidator;
    }();

    Validation.LettersOnlyValidator = LettersOnlyValidator;
})(Validation || (Validation = {}));
// Some samples to try
var strings = ["Hello", "98052", "101"];
// Validators to use
var validators = {};
validators["Letters only"] = new Validation.LettersOnlyValidator();
console.log("namespacing");
console.log("valid string? " + validators["Letters only"].isAcceptable("abc123")); //false

},{}],6:[function(require,module,exports){
"use strict";

//strings
var x = 10;
var y = "String 2";
var z = "This is string " + y + "\n\tand continuing string " + (x + 1);
var z2 = "This is string " + y + "\n and continuing string " + (x + 1);
console.log("Strings");
console.log("a ` based string: \n" + z);
console.log('standard string: \n' + z2);
//arrays
var xArray = [1, 2, 3];
var yArray = [1, 2, 3];
console.log("Arrays");
console.log(xArray);
;
console.log(yArray);
//enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var xEnum = Color.Green;
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 2] = "Red";
    Color2[Color2["Green"] = 4] = "Green";
    Color2[Color2["Blue"] = 6] = "Blue";
})(Color2 || (Color2 = {}));
;
var yEnum = Color2.Green;
var zEnum = Color2[4];
console.log("Enums");
console.log(yEnum); // 4
console.log(zEnum); // Green
//any
var xAny = 2;
var yAny = "a string";
console.log("Any");
console.log("xAny: " + xAny); // 2
console.log("yAny: " + yAny); // a string

},{}]},{},[6,4,3,2,5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTGlzdFNlcnZpY2UudHMiLCJzcmMvT3VyV2VicGFydC50cyIsInNyYy9mdW5jdGlvbnMudHMiLCJzcmMvaW50ZXJmYWNlLWNsYXNzLnRzIiwic3JjL25hbWVzcGFjaW5nLnRzIiwic3JjL3N0cmluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNJQTs7Ozs7OztBQUNDO0FBQ0E7QUFBQyxBQUNNLEFBQVk7Ozs7O0FBQ2xCLEFBQU0sbUJBQUMsQ0FBQyxBQUFRLFVBQUUsQUFBUSxBQUFDLEFBQUMsQUFDN0I7QUFBQyxBQUNGLEFBQUM7Ozs7OztBQU5ZLFFBQWdCLG1CQU01Qjs7Ozs7QUNWRCxJQUFZLEFBQVcsc0JBQU0sQUFBZSxBQUFDO0FBRTdDLElBQUksQUFBVyxjQUFpQyxJQUFJLEFBQVcsWUFBQyxBQUFnQixBQUFFLEFBQUM7QUFFbkYsSUFBSSxBQUFDLElBQWEsQUFBVyxZQUFDLEFBQVksQUFBRSxBQUFDO0FBRTdDLEFBQU8sUUFBQyxBQUFHLElBQUMsQUFBVyxjQUFHLEFBQUMsQUFBQyxBQUFDOzs7OztBQ043QixhQUFhLEFBQVMsR0FBRSxBQUFTO0FBQ2hDLEFBQU0sV0FBQyxBQUFDLElBQUcsQUFBQyxBQUFDLEFBQ2Q7QUFBQztBQUVELElBQUksQUFBYSxnQkFBRyx1QkFBUyxBQUFTLEdBQUUsQUFBUztBQUNoRCxBQUFNLFdBQUUsQUFBQyxJQUFHLEFBQUMsQUFBQyxBQUNmO0FBQUMsQUFBQztBQUVGLEFBQU8sUUFBQyxBQUFHLElBQUMsQUFBTyxVQUFHLEFBQUcsSUFBQyxBQUFDLEdBQUMsQUFBQyxBQUFDLEFBQUMsQUFBQztBQUNoQyxBQUFPLFFBQUMsQUFBRyxJQUFDLEFBQWlCLG9CQUFHLEFBQWEsY0FBQyxBQUFFLElBQUMsQUFBRSxBQUFDLEFBQUMsQUFBQzs7Ozs7Ozs7OztBQ0hyRDtBQUNBO0FBQUMsQUFDTSxBQUFZOzs7OztBQUNsQixB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QUk7QUFBQyxHQUF4QixBQUFLLFVBQUwsQUFBSyxRQUFtQjtBQUFBLEFBQUM7QUFDOUIsSUFBSSxBQUFLLFFBQVUsQUFBSyxNQUFDLEFBQUssQUFBQztBQUUvQixJQUFLLEFBQXFDO0FBQTFDLFdBQUssQUFBTTtBQUFFLGdDQUFPO0FBQUUsa0NBQVM7QUFBRSxpQ0FBUTtBQUFDLEdBQXJDLEFBQU0sV0FBTixBQUFNLFNBQStCO0FBQUEsQUFBQztBQUMzQyxJQUFJLEFBQUssUUFBVyxBQUFNLE9BQUMsQUFBSyxBQUFDO0FBQ2pDLElBQUksQUFBSyxRQUFXLEFBQU0sT0FBQyxBQUFDLEFBQUMsQUFBQztBQUU5QixBQUFPLFFBQUMsQUFBRyxJQUFDLEFBQU8sQUFBQyxBQUFDO0FBQ3JCLEFBQU8sUUFBQyxBQUFHLElBQUMsQUFBSyxBQUFDLEFBQUMsUUFBQyxBQUFJO0FBQ3hCLEFBQU8sUUFBQyxBQUFHLElBQUMsQUFBSyxBQUFDLEFBQUMsUUFBQyxBQUFRO0FBRTVCLEFBQUs7QUFDTCxJQUFJLEFBQUksT0FBUSxBQUFDLEFBQUM7QUFDbEIsSUFBSSxBQUFJLE9BQVEsQUFBVSxBQUFDO0FBRTNCLEFBQU8sUUFBQyxBQUFHLElBQUMsQUFBSyxBQUFDLEFBQUM7QUFDbkIsQUFBTyxRQUFDLEFBQUcsSUFBQyxBQUFRLFdBQUcsQUFBSSxBQUFDLEFBQUMsT0FBQyxBQUFJO0FBQ2xDLEFBQU8sUUFBQyxBQUFHLElBQUMsQUFBUSxXQUFHLEFBQUksQUFBQyxBQUFDLE9BQUMsQUFBVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgaW50ZXJmYWNlIElMaXN0c1NlcnZpY2Uge1xyXG5cdGdldExpc3ROYW1lcygpOiBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vY2tMaXN0c1NlcnZpY2UgaW1wbGVtZW50cyBJTGlzdHNTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHR9XHJcblx0cHVibGljIGdldExpc3ROYW1lcygpOiBzdHJpbmdbXSB7XHJcblx0XHRyZXR1cm4gW1wibGlzdCAxXCIsIFwibGlzdCAyXCJdO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBMaXN0U2VydmljZSBmcm9tICcuL0xpc3RTZXJ2aWNlJztcclxuXHRcdFxyXG5sZXQgZGF0YVNlcnZpY2U6IExpc3RTZXJ2aWNlLk1vY2tMaXN0c1NlcnZpY2UgPSBuZXcgTGlzdFNlcnZpY2UuTW9ja0xpc3RzU2VydmljZSgpO1xyXG5cdFx0XHJcbmxldCB5OiBzdHJpbmdbXSA9IGRhdGFTZXJ2aWNlLmdldExpc3ROYW1lcygpO1xyXG5cclxuY29uc29sZS5sb2coXCJNb2R1bGVzOiBcIiArIHkpOyIsImZ1bmN0aW9uIGFkZCh4OiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciB7XHJcblx0cmV0dXJuIHggKyB5O1xyXG59XHJcblxyXG5sZXQgbXlBZGRGdW5jdGlvbiA9IGZ1bmN0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRyZXR1cm4gIHggKyB5O1xyXG59O1xyXG5cclxuY29uc29sZS5sb2coXCJhZGQ6IFwiICsgYWRkKDEsMikpO1xyXG5jb25zb2xlLmxvZyhcIm15QWRkRnVuY3Rpb246IFwiICsgbXlBZGRGdW5jdGlvbigxMCwxMSkpOyIsImludGVyZmFjZSBJTGlzdHNTZXJ2aWNlIHtcclxuICBnZXRMaXN0TmFtZXMoKTogc3RyaW5nW107XHJcbiAgZ2V0TGlzdENvbHVtbk5hbWVzKGxpc3RJZDogc3RyaW5nKTogc3RyaW5nW107XHJcbn1cclxuXHJcbmNsYXNzIE1vY2tMaXN0c1NlcnZpY2UgaW1wbGVtZW50cyBJTGlzdHNTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHR9XHJcblx0cHVibGljIGdldExpc3ROYW1lcygpOiBzdHJpbmdbXSB7XHJcblx0XHRyZXR1cm4gW1wibGlzdCAxXCIsIFwibGlzdCAyXCJdO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldExpc3RDb2x1bW5OYW1lcyhsaXN0SWQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuXHRcdGlmIChsaXN0SWQgPT09IFwib25lXCIpIHtcclxuXHRcdFx0cmV0dXJuIFtcImNvbHVtbiAxXCIsIFwiY29sdW1uIDJcIl07XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIFtcImNvbHVtbiAzXCIsIFwiY29sdW1uIDRcIl07XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5sZXQgbGlzdFNlcnZpY2U6IE1vY2tMaXN0c1NlcnZpY2UgPSBuZXcgTW9ja0xpc3RzU2VydmljZSgpO1xyXG5cclxuY29uc29sZS5sb2cobGlzdFNlcnZpY2UuZ2V0TGlzdE5hbWVzKCkpOyAvLyBzdHJpbmcgYXJyYXk6IFvigJxsaXN0IDHigJ0sIOKAnGxpc3QgMuKAnV1cclxuY29uc29sZS5sb2cobGlzdFNlcnZpY2UuZ2V0TGlzdENvbHVtbk5hbWVzKFwidHdvXCIpKTsgLy9zdHJpbmcgYXJyYXkgW+KAnGNvbHVtbiAz4oCdLCDigJxjb2x1bW4gNOKAnV1cclxuIiwibmFtZXNwYWNlIFZhbGlkYXRpb24ge1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgU3RyaW5nVmFsaWRhdG9yIHtcclxuXHRcdGlzQWNjZXB0YWJsZShzOiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgbGV0dGVyc1JlZ2V4cCA9IC9eW0EtWmEtel0rJC87XHJcblx0Y29uc3QgbnVtYmVyUmVnZXhwID0gL15bMC05XSskLztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIExldHRlcnNPbmx5VmFsaWRhdG9yIGltcGxlbWVudHMgU3RyaW5nVmFsaWRhdG9yIHtcclxuXHRcdGlzQWNjZXB0YWJsZShzOiBzdHJpbmcpIHtcclxuXHRcdFx0cmV0dXJuIGxldHRlcnNSZWdleHAudGVzdChzKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8vIFNvbWUgc2FtcGxlcyB0byB0cnlcclxubGV0IHN0cmluZ3MgPSBbXCJIZWxsb1wiLCBcIjk4MDUyXCIsIFwiMTAxXCJdO1xyXG5cclxuLy8gVmFsaWRhdG9ycyB0byB1c2VcclxubGV0IHZhbGlkYXRvcnM6IHsgW3M6IHN0cmluZ106IFZhbGlkYXRpb24uU3RyaW5nVmFsaWRhdG9yOyB9ID0ge307XHJcbnZhbGlkYXRvcnNbXCJMZXR0ZXJzIG9ubHlcIl0gPSBuZXcgVmFsaWRhdGlvbi5MZXR0ZXJzT25seVZhbGlkYXRvcigpO1xyXG5cclxuY29uc29sZS5sb2coXCJuYW1lc3BhY2luZ1wiKTtcclxuY29uc29sZS5sb2coXCJ2YWxpZCBzdHJpbmc/IFwiICsgdmFsaWRhdG9yc1tcIkxldHRlcnMgb25seVwiXS5pc0FjY2VwdGFibGUoXCJhYmMxMjNcIikpOyAvL2ZhbHNlXHJcbiIsIi8vc3RyaW5nc1xyXG5sZXQgeDogbnVtYmVyID0gMTA7XHJcbmxldCB5OiBzdHJpbmcgPSBcIlN0cmluZyAyXCI7XHJcbmxldCB6OiBzdHJpbmcgPSBgVGhpcyBpcyBzdHJpbmcgJHt5fVxyXG5cdGFuZCBjb250aW51aW5nIHN0cmluZyAke3ggKyAxfWA7XHJcblxyXG5cclxubGV0IHoyOiBzdHJpbmcgPSBcIlRoaXMgaXMgc3RyaW5nIFwiICsgeSArIFwiXFxuIGFuZCBjb250aW51aW5nIHN0cmluZyBcIiArICh4ICsgMSk7XHJcblxyXG5jb25zb2xlLmxvZyhcIlN0cmluZ3NcIik7XHJcbmNvbnNvbGUubG9nKFwiYSBgIGJhc2VkIHN0cmluZzogXFxuXCIgKyB6KTtcclxuY29uc29sZS5sb2coJ3N0YW5kYXJkIHN0cmluZzogXFxuJyArIHoyKTtcclxuXHJcbi8vYXJyYXlzXHJcbmxldCB4QXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDNdO1xyXG5sZXQgeUFycmF5OiBBcnJheTxudW1iZXI+ID0gWzEsIDIsIDNdO1xyXG5cclxuY29uc29sZS5sb2coXCJBcnJheXNcIik7XHJcbmNvbnNvbGUubG9nKHhBcnJheSk7O1xyXG5jb25zb2xlLmxvZyh5QXJyYXkpO1xyXG5cclxuXHJcblxyXG4vL2VudW1cclxuZW51bSBDb2xvciB7UmVkLCBHcmVlbiwgQmx1ZX07XHJcbmxldCB4RW51bTogQ29sb3IgPSBDb2xvci5HcmVlbjtcclxuXHJcbmVudW0gQ29sb3IyIHtSZWQgPSAyLCBHcmVlbiA9IDQsIEJsdWUgPSA2fTtcclxubGV0IHlFbnVtOiBDb2xvcjIgPSBDb2xvcjIuR3JlZW47XHJcbmxldCB6RW51bTogc3RyaW5nID0gQ29sb3IyWzRdO1xyXG5cclxuY29uc29sZS5sb2coXCJFbnVtc1wiKTtcclxuY29uc29sZS5sb2coeUVudW0pOyAvLyA0XHJcbmNvbnNvbGUubG9nKHpFbnVtKTsgLy8gR3JlZW5cclxuXHJcbi8vYW55XHJcbmxldCB4QW55OiBhbnkgPSAyO1xyXG5sZXQgeUFueTogYW55ID0gXCJhIHN0cmluZ1wiO1xyXG5cclxuY29uc29sZS5sb2coXCJBbnlcIik7XHJcbmNvbnNvbGUubG9nKFwieEFueTogXCIgKyB4QW55KTsgLy8gMlxyXG5jb25zb2xlLmxvZyhcInlBbnk6IFwiICsgeUFueSk7IC8vIGEgc3RyaW5nIl19
