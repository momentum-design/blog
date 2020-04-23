'use strict';
const { join } = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');

var Remark = function(arg) {
    this.Arg = arg;
};
Remark.prototype = {
    RegMdFile: /\.md$/i,
    process: function() {
        if(this.RegMdFile.test(this.Arg.path)) {
            this.read();
            this.yml();
            this.remarkAt();
            this.catrgories();
            this.save();
        }
    },
    yml: function() {
        var source = this.Source,
            match = source.match(/^\<\!\-\-\s*(\S[\S\s]*?\S)\s*\-\-\>/);
        if(match && match.length>1) {
            this.Source = source.replace(match[0],match[1]);
        }
    },
    remarkAt: function() {
        var source = this.Source,
            match = source.match(/\<\!\-\-\@\s*(\S[\S\s]*?\S)\s*\@\-\-\>/g) || [],
            newStr,
            l = match.length,
            i=0;

        for(;i<l;i++) {
            newStr = match[i].replace(/^\<\!\-\-\@/,'').replace(/\@\-\-\>$/,'');
            source = source.replace(match[i], newStr);
        }
        
        this.Source = source;
    },
    catrgories: function() {
        var temp = front.parse(this.Source),
            categories = this.Arg.path.split('/');
            
        var depth = categories.length-2;
    
        if (depth==0) {
            return;
        }
    
        var newCategories = categories.slice(1, 1+Math.min(depth, categories.length-2));
    
        if (Array.isArray(temp.categories) && (temp.categories.join("_") == newCategories.join("_"))) return;

        temp.categories = newCategories;
        this.Source = '---\n' + front.stringify(temp);

    },
    read: function() {
        this.Full_source = join(hexo.source.context.source_dir, this.Arg.path);
        this.Source = fs.readFileSync(this.Full_source, { encoding: 'utf-8' } );
    },
    save: function() {
        fs.writeFileSync(this.Full_source, this.Source, { encoding: 'utf-8' } );
    }
};

var _process = function(arg) {
    var r = new Remark(arg);
    return r.process();
}

hexo.source.on('processBefore', _process);
