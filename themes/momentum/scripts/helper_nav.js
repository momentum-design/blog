let temp_side = '<a class="md-list-item $active$ md-list-item_cap md-list-item__center" role="listitem" href="$href$">$text$</a>';
let temp_top = '<a class="md-list-item $active$" role="listItem" href="$href$">$text$</a>';

let shortTitle = function(title) {
    let t = title.split('/');
    return t[t.length-1].replace('_', ' ').replace('-', ' ');
};

let getNavLink = function(item) {
    let posts = item.posts;
    if(posts && posts.length>0) {
        return posts.sort('-date').data[0].permalink;
    }
    return item.permalink;
};

let search = function(query, prop,id) {
    let _items=[];
    query.each(function(item) {
        if(item[prop] === id) {
            _items.push(item);
        }
    });
    return _items;
};

// const fragment_cache = hexo.extend.helper.get('fragment_cache').bind(hexo);

hexo.extend.helper.register('md_list', function(page){
    let query = page.categories;
    if(page.slug && page.slug.indexOf('event')!==-1) {
        console.log(page.raw)
    }
    if(query && query.length>0) {
        let post = query.data[query.length-1].posts;
        if(post.length > 0) {
            let arr = [];
            post.sort('-date').each(function(item){
                arr.push(temp_side
                    .replace('$active$', function() {
                        return item.permalink === page.permalink ? 'active' : '';
                    })
                    .replace('$href$',item.permalink)
                    .replace('$text$',shortTitle(item.slug)));
            });
            return arr.join('');
        }
    }
    return '';
});

hexo.extend.helper.register('md_nav', function(site, page){
    //parent _id
    let query = page.categories,
        squery = site.categories,
        ret=[];
    if(squery && query && query.length>1) {
        let projectId = query.data[1]._id,
            thisId = query.length > 2 ? query.data[2]._id : '';
        let navs = search(squery, 'parent', projectId),
            item;
        for(let i=0,l= navs.length;i<l;i++) {
            item = navs[i];
            ret.push(temp_side
                .replace('$active$', function() {
                    return item._id === thisId ? 'active' : '';
                })
                .replace('$href$',getNavLink(item))
                .replace('$text$',shortTitle(item.slug)));
        }
        return ret.join('');
    }
    return '';
});
