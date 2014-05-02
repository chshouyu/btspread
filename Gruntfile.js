/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            build: {
                src: 'src/js/content.js',
                dest: 'build/js/content.js'
            }
        },
        cssmin: {
            build: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'build/css/page.css': ['src/css/page.css']
                }
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: "src/",
                    src: ['manifest.json', 'js/jquery-2.1.0.min.js'],
                    dest: 'build/',
                    filter: 'isFile'
                }]
            }
        },
        clean: ['build/']
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task.
    grunt.registerTask('build', ['clean', 'cssmin:build', 'uglify:build', 'copy:build']);

};