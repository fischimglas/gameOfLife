module.exports = {
    files: {
        javascripts: {
            joinTo: {
                'vendor.js': /^(?!app|!gameOfLife)/,
                'app.js': /^app/,
                'gameOfLife.js': /^gameOfLife/
            }
        },
        stylesheets: {
            joinTo: {
                'app.css': /^app/
            }
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
