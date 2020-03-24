var front = require('hexo-front-matter');
var fs = require('hexo-fs');
debugger;
let logic = function(data) {
    var log = this.log;

    

    if (data.layout != 'post')
        return data;
    
    if (!this.config.render_drafts && data.source.startsWith("_drafts/"))
        return data;


    var overwrite = true;
    if (this.config.auto_category.enable && overwrite) {
        let postStr;
        // 1. parse front matter
        var tmpPost = front.parse(data.raw);
        // 2. read old categories
        //
        // console.log('11111');
        // 3. generate categories from directory
        // var categories = data.slug.split('/');
    }
    return data
}

hexo.extend.filter.register('before_post_render', logic, 15);
