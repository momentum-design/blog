var front = require('hexo-front-matter');
var fs = require('hexo-fs');
debugger;
let logic = function(data) {
    return data
}

hexo.extend.filter.register('before_post_render', logic, 15);
