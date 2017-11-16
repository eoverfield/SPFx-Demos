namespace Validation {
	export interface StringValidator {
		isAcceptable(s: string): boolean;
	}

	const lettersRegexp = /^[A-Za-z]+$/;
	const numberRegexp = /^[0-9]+$/;

	export class LettersOnlyValidator implements StringValidator {
		isAcceptable(s: string) {
			return lettersRegexp.test(s);
		}
	}
	/*
	export class NumbersOnlyValidator implements StringValidator {
		isAcceptable(s: string) {
			return numberRegexp.test(s);
		}
	}
	*/
}

// Some samples to try
let strings = ["Hello", "abc123", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["Letters only"] = new Validation.LettersOnlyValidator();
//validators["Numbers only"] = new Validation.NumbersOnlyValidator();

console.log("namespacing");
console.log("valid string? " + validators["Letters only"].isAcceptable(strings[1])); //false
//console.log("valid int? " + validators["Numbers only"].isAcceptable("asd123")); //false
