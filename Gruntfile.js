/*global module:false*/
module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
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
                src: 'src/js/content2.js',
                dest: 'build/js/content2.js'
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
                    src: ['manifest.json'],
                    dest: 'build/',
                    filter: 'isFile'
                }]
            }
        },
        clean: ['build/']
    });

    // Default task.
    grunt.registerTask('build', ['clean', 'cssmin:build', 'uglify:build', 'copy:build']);

};