module.exports = function(i) {
	let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let isNumber = false;
	for(let idx = 0; idx < numbers.length; idx++) {
		if(i == numbers[idx]) {
			isNumber = true;
			break;
		};
	};
	if(isNumber) { return true }
	else { return false };
};
