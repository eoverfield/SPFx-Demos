(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockListsService {
    constructor() {
    }
    getListNames() {
        return ["list 1", "list 2"];
    }
}
exports.MockListsService = MockListsService;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListService = require("./ListService");
let dataService = new ListService.MockListsService();
let y = dataService.getListNames();
console.log("Modules: " + y);
},{"./ListService":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTGlzdFNlcnZpY2UudHMiLCJzcmMvT3VyV2VicGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDSUE7SUFDQztJQUNBLENBQUM7SUFDTSxZQUFZO1FBQ2xCLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0Q7QUFORCw0Q0FNQzs7OztBQ1ZELDZDQUE2QztBQUU3QyxJQUFJLFdBQVcsR0FBaUMsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUVuRixJQUFJLENBQUMsR0FBYSxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7QUFFN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGludGVyZmFjZSBJTGlzdHNTZXJ2aWNlIHtcclxuXHRnZXRMaXN0TmFtZXMoKTogc3RyaW5nW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2NrTGlzdHNTZXJ2aWNlIGltcGxlbWVudHMgSUxpc3RzU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXRMaXN0TmFtZXMoKTogc3RyaW5nW10ge1xyXG5cdFx0cmV0dXJuIFtcImxpc3QgMVwiLCBcImxpc3QgMlwiXTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgTGlzdFNlcnZpY2UgZnJvbSAnLi9MaXN0U2VydmljZSc7XHJcblx0XHRcclxubGV0IGRhdGFTZXJ2aWNlOiBMaXN0U2VydmljZS5Nb2NrTGlzdHNTZXJ2aWNlID0gbmV3IExpc3RTZXJ2aWNlLk1vY2tMaXN0c1NlcnZpY2UoKTtcclxuXHRcdFxyXG5sZXQgeTogc3RyaW5nW10gPSBkYXRhU2VydmljZS5nZXRMaXN0TmFtZXMoKTtcclxuXHJcbmNvbnNvbGUubG9nKFwiTW9kdWxlczogXCIgKyB5KTsiXX0=
