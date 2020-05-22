module.exports = {
    files: {
        javascripts: {
            joinTo: {
                'vendor.js': /^(?!app)/,
                'app.js': /^app|gameOfLife/,
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
