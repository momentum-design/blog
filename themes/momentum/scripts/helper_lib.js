const url_for = hexo.extend.helper.get('url_for').bind(hexo);

const source = function (path) {
    let cfg,
        ret = [];
    if (typeof path === 'string') {
        cfg = [path];
    } else {
        cfg = path || [];
    }
    for (var i = 0, l = cfg.length; i < l; i++) {
        var _path = 'lib/'+ cfg[i];
        if (/.css$/i.test(_path)) {
            ret.push(`<link rel="stylesheet" href="${url_for(_path)}">\n`);
        } else {
            ret.push(`<script type="text/javascript" src="${url_for(_path)}"></script>\n`);
        }
    }
    return ret.join('');
};

hexo.extend.helper.register('md_head_lib', function (page) {
    if (page && typeof page.slug === 'string') {
        var arr = page.slug.split('/');
        if (arr.length > 1) {
            var lib = arr[1];
            if (this.config.md_head_lib) {
                var _path = this.config.md_head_lib[lib];
                if (_path) {
                    return source(_path);
                }
            }
        }
    }
    return '';
});
