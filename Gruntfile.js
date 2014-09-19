// Generated on 2013-10-07 using generator-webapp 0.4.3
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie >= 7']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.app %>/{,*/}index.html'
    },
    usemin: {
      options: {
        dirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // This task is pre-configured if you do not wish to use Usemin
      // blocks for your CSS. By default, the Usemin block from your
      // `index.html` will take care of minification, e.g.
      //
      //     <!-- build:css({.tmp,app}) styles/main.css -->
      //
      // dist: {
      //     files: {
      //         '<%= yeoman.dist %>/styles/main.css': [
      //             '.tmp/styles/{,*/}*.css',
      //             '<%= yeoman.app %>/styles/{,*/}*.css'
      //         ]
      //     }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
        // https://github.com/yeoman/grunt-usemin/issues/44
        //collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '{,*/}*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt,pdf}',
            //'.htaccess',
            //'web.config',
            //'.gitignore',
            //'CNAME',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    aws: grunt.file.readJSON('/home/laurent/lebeaumartin.com/aws.json'),
    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>',
        secretAccessKey: '<%= aws.AWSSecretKey %>',
        region: 'us-east-1',
        bucket: 'lebeaumartin.com',
        sslEnabled: true,
        uploadConcurrency: 5,
        downloadConcurrency: 5,
        differential: true,
        excludedFromGzip: ['*.png', '*.gif', '*.jpg', '*.jpeg', '*.woff', '*.pdf'],
      },
      production: {
        files: [{
          action: 'delete',
          cwd: 'dist/',
          src: ['**'],
          dest: '/',
        }, { // Gzipped files (non-revisioned)
          expand: true,
          cwd: 'dist/',
          src: ['{,*/}*.{html,ico}'],
          dest: '',
          params: {
            ContentEncoding: 'gzip',
            CacheControl: 'max-age=7200, must-revalidate'
          }
        }, { // Gzipped assets (revisioned)
          expand: true,
          cwd: 'dist/styles/',
          src: [
            '{,*/}*.css',
            '{,*/}*.{ttf,svg,eot}',
          ],
          dest: 'styles/',
          params: {
            ContentEncoding: 'gzip',
            CacheControl: 'max-age=31536000'
          }
        }, { // Non gzipped assets
          expand: true,
          cwd: 'dist/styles/',
          src: [
            '{,*/}*.{png,jpg,jpeg,gif,webp}',
            '{,*/}*.woff',
          ],
          dest: 'styles/',
          params: {
            CacheControl: 'max-age=31536000'
          }
        }, { // PDF: No gzip, no caching
          expand: true,
          cwd: 'dist/',
          src: ['*.pdf'],
          dest: ''
        }]
      }
    }
  });

  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'copy:dist',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('aws', [
    'aws_s3:production'
  ]);

  grunt.registerTask('default', [
    //'jshint',
    //'test',
    'build'
  ]);
};