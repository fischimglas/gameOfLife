module.exports = {
	server: {
		port: 3002,
	},
	autoReload: {enabled: true},
	files: {
		javascripts: {
			joinTo: {
				'vendor.js': /^(?!app|vendor)/,
				'app.js': /^app/,
			},
		},
	},
	conventions: {
		ignored: [
			/^vendor/,
			/^etc/,
			/^node_modules/,
		],
	},
	paths: {
		public: 'public',
	},
	plugins: {
		babel: {
			presets: [
				["@babel/preset-env"],
			],
			// plugins: ["syntax-async-functions", "transform-regenerator"]
		},
		browserSync: {
			enabled: true,
			port: 3333,
			logLevel: "debug",
		},
	},
}
