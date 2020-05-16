module.exports = {
    files: {
        javascripts: {
            joinTo: {
                'vendor.js': /^(?!app)/,
                'app.js': /^app/
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
