//strings
var x = 10;
var y = "String 2";
var z = "This is string " + y + "\n\tand continuing string " + (x + 1);
var z2 = "This is string " + y + "\n and continuing string " + (x + 1);
console.log("Strings");
console.log("a ` based string: \n" + z);
console.log('standard string: \n' + z2);
console.log("");
//arrays
var xArray = [1, 2, 3];
var yArray = [1, 2, 3];
console.log("Arrays");
console.log(xArray);
console.log(yArray);
console.log("");
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
console.log("");
//any
var xAny = 2;
var yAny = "a string";
console.log("Any");
console.log("xAny: " + xAny); // 2
console.log("yAny: " + yAny); // a string
console.log("");
