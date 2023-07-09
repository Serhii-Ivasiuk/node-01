// node calc.js sum 3 4 3
// node calc.js sub 20 10 5
// node calc.js mult 20 10 5
// node calc.js div 100 2 5

// console.log(process.argv);

const [operator, ...arguments] = process.argv.slice(2);
const numbers = arguments.map(item => Number(item));

const calc = (operator, numbers) => {
	switch (operator) {
		case 'sum':
			return numbers.reduce((acc, item) => acc + item);
		case 'sub':
			return numbers.reduce((acc, item) => acc - item);
		case 'mult':
			return numbers.reduce((acc, item) => acc * item);
		case 'div':
			return numbers.reduce((acc, item) => acc / item);
		default:
			return 'Unknown operation type';
	}
};

const result = calc(operator, numbers);
console.log(result);
