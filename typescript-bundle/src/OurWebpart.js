"use strict";
exports.__esModule = true;
var ListService = require("./ListService");
var dataService = new ListService.MockListsService();
var y = dataService.getListNames();
console.log("Modules: " + y);
