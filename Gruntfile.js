'use strict';

module.exports = function(grunt) {
  
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    // <script src="//localhost:35729/livereload.js"></script>
    watch: {
      scripts: {
        files: ['assets/scripts/src/*.js'],
        tasks: ['jshint', 'concat'],
      },
      php: {
        files: ['{,*/}*.php'],
        tasks: ['phplint'],
      },
      styles: {
        // We watch and compile sass files as normal but don't live reload here
        files: ['assets/styles/sass/{,*/}*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        options: {
          livereload: true
        },
        files: [
          '*.php',
          'assets/styles/*.css',
          'assets/scripts/*.js'
        ]
      }
    },

    // Compiles Sass to CSS
    sass: {
      options: {
        // When you inspect an element whose styles are provided by a generated CSS file,
        // the Elements panel displays a link to the original source file,
        // not the generated .css file.
        sourcemap: true,
        loadPath: 'bower_components',
        style: 'expanded'
      },
      all: {
        expand: true,
        cwd: 'assets/styles/sass',
        src: ['*.scss'],
        dest: 'assets/styles/',
        ext: '.css'
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
        map: true,
      },
      all: {
        files: [{
          expand: true,
          cwd: 'assets/styles',
          src: '*.css',
          dest: 'assets/styles'
        }]
      }
    },

    // Minifies css
    cssmin: {
      options: {
        keepSpecialComments: true,
      },
      all: {
        expand: true,
        cwd: 'assets/styles',
        src: ['*.css', '!*.min.css'],
        dest: 'assets/styles',
        ext: '.min.css'
      }
    },

    // Minifies js
    uglify: {
      options: {
        sourceMap: true,
      },
      all: {
        files: {
          'assets/scripts/main.min.js': ['assets/scripts/main.js'],
          'assets/scripts/vendor.min.js': ['assets/scripts/main.js']
        }
      }
    },

    // Checks js syntax && style
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        // reporter stylish?
      },
      all: [
        'Gruntfile.js',
        'assets/scripts/src/{,*/}*.js'
      ]
    },

    // Combine javascripts
    concat: {
      options: {
        separator: ';',
      },
      all: {
        src: ['assets/scripts/src/{,*/}*.js'],
        dest: 'assets/scripts/main.js'
      }
    },

    bower_concat: { // jshint ignore:line
      all: {
        dest: 'assets/scripts/vendor.js',
        exclude: ['modernizr', 'bourbon']
      }
    },

    // Checks php syntax
    phplint: {
      options: {
        // defaults ?
      },
      all: ['{,*/}*.php']
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      all: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: 'assets/scripts/modernizr.min.js',
        files: {
          src: [
            'assets/scripts/*.js',
            'assets/styles/*.css',
            '!assets/scripts/modernizr.js'
          ]
        },
        uglify: true
      }
    },

    // Minify images.
    imagemin: {
      all: {
        files: [{
          expand: true,
          cwd: 'assets/images',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'assets/images'
        }]
      }
    },

    // WordPress assets revisioning
    version: {
      options: {
        manifest: 'assets/assets.json',
        summaryOnly: true,
      },
      assets: {
        options: {
          rename: true
        },
        files: {
          'functions.php': [
            'assets/styles/*.min.css',
            'assets/scripts/*.min.js'
          ]
        }
      }
    },

    // Cleans files from last build
    clean: {
      all: [
        'assets/styles/*.css',
        'assets/scripts/*.js'
      ]
    },

    // deploy
    rsync: {
      options: {
        args: [
          '-axzvh',
          '--delete',
          '--delete-after',
          // '--dry-run'
        ],
        exclude: [
          '.git',
          '.gitignore',
          '.sass-cache',
          'styles/sass/',
          'scripts/src/',
          '.DS_Store',
          'node_modules',
          'Gruntfile.js',
          'package.json',
          'bower.json',
          'bower_components',
          '.jshintrc'
        ],
        recursive: true
      },
      dev: {
        options: {
          src: './',
          // remote path must exist prior to deploy
          // dest: '/sub/polleo-test/wp-content/themes/polleo/',
          dest: '/sub/polleo-test/',
          host: 'madnes.eu@madnes.eu',
          syncDestIgnoreExcl: true
        }
      }
    },

    // Internationalize WordPress themes and plugins
    makepot: {
      all: {
        options: {
          type: 'wp-theme',
          mainFile: 'style.css',
          domainPath: 'languages/'
        }
      }
    }

  });

  grunt.registerTask('default', [
    'sass',
    'autoprefixer',
    'newer:jshint',
    'newer:phplint',
    'concat',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'sass',
    'autoprefixer',
    'concat',
    'bower_concat',
    'cssmin',
    'uglify',
    'modernizr',
    'version',
    'newer:imagemin',
    'makepot'
  ]);

  
};