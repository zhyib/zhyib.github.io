var assign = require('deep-assign');
var renderer = require('./lib/renderer');

hexo.config.sequence = assign({
  webfont: 'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.27/webfontloader.js',
  // sequence-diagram 1.x 版本依赖 raphael, 2.x版本依赖 snap
  raphael: 'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js',
  snap: 'https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.4.1/snap.svg-min.js',
  underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
  sequence: 'https://cdnjs.cloudflare.com/ajax/libs/js-sequence-diagrams/1.0.6/sequence-diagram-min.js',
  css: '',
  options: {
    theme: 'simple'
  }
}, hexo.config.sequence);

hexo.extend.filter.register('before_post_render', renderer.render, 9);