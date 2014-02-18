module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('bower.json'),

    //  Basic configuration
    config: {
      src_dir: '.',
      dest_dir: 'dist'
    },

    //  Configure plugins
    bump: {
      options: {
        commitFiles: [
          'package.json',
          'bower.json'
        ],
        files: [
          'package.json',
          'bower.json'
        ],
        pushTo: 'origin',
        updateConfigs: [
          'pkg',
          'bower'
        ]
      }
    },

    clean: {
      dist: {
        src: [
          '<%= config.dest_dir %>'
        ]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.js_src_dir %>/*.js'
      ]
    },

    uglify: {
      default: {
        files: {
          '<%= config.dest_dir %>/vrangler.js': ['<%= config.src_dir %>/vrangler.js']
        }
      }
    },

    watch: {
      dev: {
        files:  [
          'Gruntfile.js',
          '<%= config.src_dir %>/vrangler.js'
        ],
        tasks: 'jshint'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', function () {
    grunt.task.run([
      'clean:dist',
      'jshint',
      'uglify'
    ]);
  });

};
