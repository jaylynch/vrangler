vrangler
========

Convert many and varied video URLs into consistently formatted, ready to use
embed tags.

Handy for allowing users to paste "video links" into an input when you need a
standardized result.

Installation
============

Bower: `bower install --save vrangler`
NPM: `npm install --save vrangler`

Use
===

With RequireJS:

```javascript
define(['vrangler'], function(Vrangler){
  console.log(Vrangler.vrangle('http://www.youtube.com/watch?v=wZZ7oFKsKzY', { embed: {width: 50, height: 999}}));
  console.log(Vrangler.getVideoID('http://vimeo.com/43476107', 'vimeo'));
  console.log(Vrangler.getVideoID('<iframe src="//player.vimeo.com/video/43476107" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/43476107">Nyan Cat [Original]</a> from <a href="http://vimeo.com/user9837797">CrazyLpsBattle</a> on <a href="https://vimeo.com">Vimeo</a>.</p>'));
});
```

```
> <iframe width="600" height="300" src="//www.youtube.com/embed/wZZ7oFKsKzY" frameborder="0" allowfullscreen></iframe>
> 43476107
> { type: 'vimeo', id: 43476107 }
```

Or in Node:

```javascript
vrangler = require('vrangler');
console.log(vrangler.vrangle('http://www.youtube.com/watch?v=wZZ7oFKsKzY'));
```

```
> <iframe width="600" height="300" src="//www.youtube.com/embed/wZZ7oFKsKzY" frameborder="0" allowfullscreen></iframe>
```

Configuration
=============

Coming soon.
