//strings
let x: number = 10;
let y: string = "String 2";
let z: string = `This is string ${y}
	and continuing string ${x + 1}`;


let z2: string = "This is string " + y + "\n and continuing string " + (x + 1);

console.log("Strings");
console.log("a ` based string: \n" + z);
console.log('standard string: \n' + z2);

//arrays
let xArray: number[] = [1, 2, 3];
let yArray: Array<number> = [1, 2, 3];

console.log("Arrays");
console.log(xArray);;
console.log(yArray);



//enum
enum Color {Red, Green, Blue};
let xEnum: Color = Color.Green;

enum Color2 {Red = 2, Green = 4, Blue = 6};
let yEnum: Color2 = Color2.Green;
let zEnum: string = Color2[4];

console.log("Enums");
console.log(yEnum); // 4
console.log(zEnum); // Green

//any
let xAny: any = 2;
let yAny: any = "a string";

console.log("Any");
console.log("xAny: " + xAny); // 2
console.log("yAny: " + yAny); // a string