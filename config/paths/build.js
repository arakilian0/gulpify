let build = "dist";

module.exports = {
	main: `${build}`,
	components: `${build}/assets/components`,
	style: {
		main: `${build}/assets/styles/main.scss`,
		views: `${build}/assets/styles/views`
	},
	script: {
		main: `${build}/assets/scripts/main.js`,
		views: `${build}/assets/scripts/views`
	}
};
