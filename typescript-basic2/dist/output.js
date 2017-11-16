var MockListsService = /** @class */ (function () {
    function MockListsService() {
    }
    MockListsService.prototype.getListNames = function () {
        return ["list 1", "list 2"];
    };
    MockListsService.prototype.getListColumnNames = function (listId) {
        if (listId === "one") {
            return ["column 1", "column 2"];
        }
        else {
            return ["column 3", "column 4"];
        }
    };
    return MockListsService;
}());
var listService = new MockListsService();
console.log(listService.getListNames()); // string array: [“list 1”, “list 2”]
console.log(listService.getListColumnNames("two")); //string array [“column 3”, “column 4”]
console.log();
function add(x, y) {
    return x + y;
}
var myAddFunction = function (x, y) {
    return x + y;
};
console.log("add: " + add(1, 2));
console.log("myAddFunction: " + myAddFunction(10, 11));
console.log();
var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;
    var LettersOnlyValidator = /** @class */ (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    }());
    Validation.LettersOnlyValidator = LettersOnlyValidator;
    /*
    export class NumbersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return numberRegexp.test(s);
        }
    }
    */
})(Validation || (Validation = {}));
// Some samples to try
var strings = ["Hello", "abc123", "98052", "101"];
// Validators to use
var validators = {};
validators["Letters only"] = new Validation.LettersOnlyValidator();
//validators["Numbers only"] = new Validation.NumbersOnlyValidator();
console.log("namespacing");
console.log("valid string? " + validators["Letters only"].isAcceptable(strings[1])); //false
//console.log("valid int? " + validators["Numbers only"].isAcceptable("asd123")); //false
