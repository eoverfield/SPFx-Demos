function add(x: number, y: number): number {
	return x + y;
}

let myAddFunction = function(x: number, y: number): number {
	return  x + y;
};

console.log("add: " + add(1,2));
console.log("myAddFunction: " + myAddFunction(10,11));