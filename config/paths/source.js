let source = "src";
let settings = "config";

module.exports = {
	main: `${source}`,
	style: {
		main: `${source}/assets/styles/main.scss`,
		views: `${source}/assets/styles/views`
	},
	script: {
		main: `${source}/assets/scripts/main.js`,
		views: `${source}/assets/scripts/views`
	},
	data: {
		main: `${settings}/template.yml`,
		boiler: `${settings}/template.boiler.yml`,
		views: `${source}/assets/data`
	}
};
