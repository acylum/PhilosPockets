const path = require('path');

module.exports = {
	core: {
		builder: 'webpack5'
	},
	stories: [
		"../stories/**/*.stories.mdx",
		'../stories/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: '@storybook/react',
	staticDirs: ['../public'],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.mjs$/,
			include: /node_modules/,
			type: 'javascript/auto',
		});

		config.module.rules.push(
		{
			test: /\\.s(a|c)ss$/,
			include: /node_modules/,
			use:[
			'style-loader',
			{
				loader: 'css-loader',
				options: {
				modules: {
					auto: true,
					localIdentName: '[name]__[local]--[hash:base64:5]',
				},
				},
			},
			'sass-loader'
			],
		},
		);


		return config;
	},
};
