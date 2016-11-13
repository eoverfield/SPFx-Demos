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
}

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["Letters only"] = new Validation.LettersOnlyValidator();

console.log("namespacing");
console.log("valid string? " + validators["Letters only"].isAcceptable("abc123")); //false
