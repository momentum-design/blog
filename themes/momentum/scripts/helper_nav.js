let shortTitle = function (title) {
    let t = title.split('/');
    return t[t.length - 1].replace('_', ' ').replace('-', ' ');
};

let getNavLink = function (item) {
    let posts = item.posts;
    if (posts && posts.length > 0) {
        return posts.sort('date').data[0].permalink;
    }
    return item.permalink;
};

let search = function (query, prop, id) {
    let _items = [];
    query.each(function (item) {
        if (item[prop] === id) {
            _items.push(item);
        }
    });
    return _items;
};

let sortkey = function(config, name) {
    if(config.md_list_sort && config.md_list_sort[name]) {
        return config.md_list_sort[name];
    }
    return  'date';
};

hexo.extend.helper.register('md_list', function (page) {
    let query = page.categories,
        ret = [];

    if (query && query.length > 0) {
        let doc = query.data[query.length - 1];
        let post = doc.posts;
        if (post.length > 0) {
            post.sort(sortkey(this.config, doc.name)).each(function (item) {
                ret.push({
                    class_active: item.permalink === page.permalink ? ' active' : '',
                    href: item.permalink,
                    text: shortTitle(item.title)
                });
            });
        }
    }
    return ret;
});

hexo.extend.helper.register('md_nav', function (site, page) {
    //parent _id
    let query = page.categories,
        squery = site.categories,
        ret = [];

    if (squery && query && query.length > 1) {
        let projectId = query.data[1]._id,
            thisId = query.length > 2 ? query.data[2]._id : '';
        let navs = search(squery, 'parent', projectId),
            item;
        
        for (let i = 0, l = navs.length; i < l; i++) {
            item = navs[i];
            ret.push({
                class_active: item._id === thisId ? ' active': '',
                href: getNavLink(item),
                text: shortTitle(item.slug)
            });
        }
    }
    return ret;
});
