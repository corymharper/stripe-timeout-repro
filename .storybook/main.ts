const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
	stories: ['../src/components/**/*.stories.tsx'],
	addons: [
		'@storybook/preset-create-react-app',
		{
			name: '@storybook/addon-essentials',
			options: {
				backgrounds: false,
			},
		},
		'storycap',
	],
	framework: '@storybook/react-webpack5',
	core: {
		builder: 'webpack5',
	},
	webpackFinal: async (config) => {
		config.resolve = {
			...config.resolve,
			symlinks: false,
		};
		
		config.plugins = [...config.plugins, new NodePolyfillPlugin()];
		
		return config;
	},
};
