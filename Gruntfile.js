module.exports = function(grunt){
    // load plugins
    [
        'grunt-contrib-less'
    ].forEach(function(task){
        grunt.loadNpmTasks(task);
    });

    // configure plugins
    grunt.initConfig({
        less: {
            development: {
                files: {
                    'public/css/main.css': 'less/main.less'
                },
                options: {
                    customFunctions: {
                        static: function(lessObject, name) {
                            return 'url("' +
                                require('./lib/static.js').map(name.value) +
                                '")';
                        }
                    }
                }
            }
        }
    });

    // register tasks
    grunt.registerTask('default', ['less']);
};