var vrangler = function(){
  'use strict';
  var config = {
    embed: {
      height: 300,
      width: 600
    }
  };

  config.youtubeTag = function(config){
    return '<iframe width="' + config.embed.width + '"' +
                  ' height="' + config.embed.height + '"' +
                  ' src="//www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>';
  }

  config.vimeoTag = function(config){
    return '<iframe src="http://player.vimeo.com/video/$1?wmode=opaque&portrait=0&amp;color=ffffff"' +
                  ' width="' + config.embed.width + '"' +
                  ' height="' + config.embed.height + '"' +
                  ' frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>';
  };

  var replacements = {
    youtube: {
      from: [
        /(?:<iframe.*?src=".*youtu.*\/)([a-zA-Z0-9\-\_]+)(?:\/?")(?:.*)?/,
        /(?:http|https)?(?:\:\/\/)?(?:www\.)?(?:youtube\.com\/|youtu\.).*?(?:watch=|v=|\/\d\/|embed\/|v\/|be\/)([a-zA-Z0-9\-\_]+)(?:\&.*)?/
      ],
      to: config.youtubeTag
    },

    vimeo: {
      from: [
        /(?:<iframe.*?src=".*?vimeo.*?\/)([a-zA-Z0-9\-\_]+)(?:\/?")(?:.*)?/,
        /(?:http|https)?(?:\:\/\/)?(?:www\.)?(?:vimeo\.com\/)([a-zA-z0-9\-\_]+)(?:\?|\/)?(?:.*)?/
      ],
      to: config.vimeoTag
    }
  };

  return {
    getVideoID : function(URL, type){
      // If "type" is provided, only check for that specific type and return ID
      if (typeof type !== 'undefined' && replacements.hasOwnProperty(type)){
        for (var i = 0; i < replacements[type].from.length; i++) {
          if (URL.match(replacements[type].from[i])){
            return URL.match(replacements[type].from[i])[1];
          }
        }
      }
      // Otherwise test against all and return a (type, id) object
      else {
        for (var key in replacements){
          for (var i = 0; i < replacements[key].from.length; i++) {
            if (URL.match(replacements[key].from[i])){
              return {
                type: key,
                id: URL.match(replacements[key].from[i])[1]
              };
            }
          }
        }
      }

      return false;
    },

    // Wrangle incoming link to appropriate embed tag, for all known formats
    vrangle : function(URL, params){
      var URL = '' + URL || '',
          currentConfig = {};

      for (var key in config){
        currentConfig[key] = config[key];
      }

      if (typeof params !== 'undefined'){
        for (var key in params){
          currentConfig[key] = params[key];
        }
      }

      for (var key in replacements){
        for (var i = 0; i < replacements[key].from.length; i++) {
          if (URL.match(replacements[key].from[i])){
            return URL.replace(replacements[key].from[i], replacements[key].to(currentConfig));
          }
        }
      }

      return URL;
    }
  };
};

if (typeof define === 'function' && define){
  define(function(){
    return vrangler();
  });
}
else if (typeof module === 'object' || typeof module === 'function'){
  module.exports = vrangler();
}
