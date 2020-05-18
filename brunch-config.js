module.exports = {
    files: {
        javascripts: {
            joinTo: {
                //'vendor.js': /^(?!app|!gameOfLife)/,
                'vendor.js': /^(?!app)/,
                'app.js': /^(app)/,
                // './../dist/gameOfLife.js': /^gameOfLife/
            }
        },
        stylesheets: {
            joinTo: {
                'app.css': /^app/
            }
        },
        templates: {
            joinTo: 'app.js'
        }
    },
    plugins: {
        babel: {
            presets: ['env']
        },
        plugins: {
            sass: {
                allowCache: true
            }
        }
    }
}
