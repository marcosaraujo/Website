module.exports = function( grunt ) {

  // Paths
  var PathConfig = {
    dev: 'src/',
    dist: 'out/'
  };

  // Set scripts
  var scripts = [

    // Jquery
    '<%= config.dev %>**/jquery-2.1.0.min.js',

      // Plugins bootstrap
    '<%= config.dev %>**/bootstrap-transition.js', // Transitions (required for any animation)
    '<%= config.dev %>**/bootstrap-modal.js', // Modals
    '<%= config.dev %>**/bootstrap-collapse.js', // Collapse

    // General starting
    'src/**/_general.js'
  ];

  grunt.initConfig({

  // Config path
  config: PathConfig,

  // Clean files
  clean: {
    dist: [
      "<%= config.dist %>/files/",
      "<%= config.dist %>/**/bootstrap/",
      "<%= config.dist %>/**/jquery/",
      "<%= config.dist %>/**/_general.js",
      "<%= config.dist %>/**/less/"
    ]
  },

  // HTMLmin
  htmlmin: {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: [{
        expand: true,
        cwd: '<%= config.dist %>',
        src: ['*.html','**/*.html'],
        dest: '<%= config.dist %>',
      }],
    }
 },

  // imageMin
  imagemin: {
    dist: {
      options: {
      optimizationLevel: 3
    },
    files: [{
        expand: true,
        cwd: '<%= config.dist %>',
        src: ['**/*.png', '**/*.jpg', '**/*.jpeg'],
        dest: '<%= config.dist %>',
      }],
    }
  },

  // Less
  less: {
    dist: {
      options: {
        compress: true,
        cleancss: true
      },
      files: {
        "<%= config.dist %>assets/css/style.css": "<%= config.dev %>files/assets/css/less/style.less"
      }
    },
    dev: {
     files: {
       "<%= config.dev %>files/assets/css/style.css": "<%= config.dev %>files/assets/css/less/style.less"
     }
    }
  },

  // Uglify
  uglify: {
    options: {
      mangle : false
    },
    dev: {
      files : {
        '<%= config.dev %>files/assets/js/scripts.min.js': scripts
      }
    }
  },

  // Watch
  watch : {
     options: {
      debounceDelay: 500,
    },
    less: {
      files : [
      '<%= config.dev %>**/*.less'
      ],
      tasks : ['less:dev']
    },
    js: {
      files : [
      '<%= config.dev %>**/js/*.js',
      '!<%= config.dev %>**/js/scripts.min.js',
      'Gruntfile.js'
      ],
      tasks : ['uglify:dev']
    }
  },

  // GZip Assets
  compress: {
    gzip: {
      options: {
        mode: 'gzip'
      },
      expand: true,
      cwd: '<%= config.dist %>assets/',
      src: ['**/*.css', '**/*.js'],
      dest: '<%= config.dist %>/assets/'
    }
  },


});

// Grunt plugins
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');

// Tasks runnings
grunt.registerTask( 'build', ['htmlmin:dist', 'imagemin:dist', 'less:dist', 'clean:dist'] );

// Watch
grunt.registerTask( 'w', [ 'watch' ] );

};