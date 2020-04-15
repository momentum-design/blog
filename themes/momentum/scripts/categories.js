'use strict';
const Promise = require('bluebird');
var front = require('hexo-front-matter');
var fs = require('hexo-fs');
var logic = function(data) {
    if (data.layout != 'post') return data;
    
    var postStr,
        tmpPost;
    // 1. parse front matter if in remark
    var match = data.raw.match(/\<\!\-\-\s*(\S[\S\s]*\S)\s*\-\-\>/);
    if(match && match.length>1) {
        tmpPost = front.parse(data.raw.replace(match[0],match[1]));
    } else {
        tmpPost = front.parse(data.raw);
    }

    // 2. read old categories
    //
    // 3. generate categories from directory
    // var categories = data.slug.split('/');
    var categories = data.source.split('/');
    // 3.1 handle depth
    var depth = this.config.auto_category.depth || categories.length-2;


    if (depth==0) { // Uncategorized
        //tmpPost.categories = ["Uncategorized"];
        return data;
    }

    var newCategories = categories.slice(1, 1+Math.min(depth, categories.length-2));
    // 3.2 prevents duplicate file changes

    if (Array.isArray(tmpPost.categories) && (tmpPost.categories.join("_") == newCategories.join("_"))) return data;
    tmpPost.categories = newCategories;

    // 4. process post
    postStr = front.stringify(tmpPost);
    postStr = '---\n' + postStr;
    data.raw = postStr;
    fs.writeFileSync(data.full_source, postStr, 'utf-8');

    //console.log("Generated: categories [%s] for post [%s]", tmpPost.categories, categories[categories.length-1]);
    return data;
}

hexo.extend.filter.register('before_post_render', logic, 1000);
