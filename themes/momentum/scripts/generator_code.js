const _supports = {
    html: {
        regAll: /(\<\!\-\-\#html\d+\#\-\-\>)\s*\`\`\`\s*(\S[\S\s]*?\S)\s*\`\`\`/gi,
        reg: /(\<\!\-\-\#html\d+\#\-\-\>)\s*\`\`\`\s*(\S[\S\s]*?\S)\s*\`\`\`/i,
        warp: '<div class=\'artilce_demo\'>$content$</div>'
    },
    css: {
        regAll: /(\<\!\-\-\#css\d+\#\-\-\>)\s*\`\`\`\s*(\S[\S\s]*?\S)\s*\`\`\`/gi,
        reg: /(\<\!\-\-\#css\d+\#\-\-\>)\s*\`\`\`\s*(\S[\S\s]*?\S)\s*\`\`\`/i,
        warp: '<style type="text/css">$content$</style>'
    },
    javascript: {
        regAll: /(\<\!\-\-\#javascript\d+\#\-\-\>)\s*\`\`\`\s*(\S[\S\s]*?\S)\s*\`\`\`/gi,
        reg: /(\<\!\-\-\#javascript\d+\#\-\-\>)\s*\`\`\`\s*(\S[\S\s]*?\S)\s*\`\`\`/i,
        warp: '<script type="text/javascript">$content$</script>'
    }
};

const insertCode = function(data) {
    var raw = data.raw,
        content = data.content;
    for(var name in _supports) {
        let _ = _supports[name],
            _matches = raw.match(_.regAll) || [],
            i=0,
            l=_matches.length ;
        if(l>0) {
            for(;i<l;i++) {
                var __match = _matches[i].match(_.reg),
                    __placeholder = __match[1]
                    __insert = _.warp.replace('$content$', __match[2]);
                content = content.replace(__placeholder, __insert );
            }
        }
    }
    data.content = content;
    return data;
};


hexo.extend.filter.register('after_post_render', insertCode);