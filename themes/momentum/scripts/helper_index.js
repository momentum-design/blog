let template_card = `<div class="md-card">
    <div class="md-card-section">
        <h4>$project$</h4>
        <h6>$title$</h6>
    </div>
    <div class="md-card-section">$desc$</div>
    <div class="md-card-section">
        <a href="$href$" style="margin-right: 16px;">>>more</a>
    </div>
</div>`;

let search = function(query, prop,id) {
    let _items=[];
    query.each(function(item) {
        if(item[prop] === id) {
            _items.push(item);
        }
    });
    return _items;
};

let shortTitle = function(title) {
    let t = title.split('/');
    return t[t.length-1].replace('_', ' ').replace('-', ' ');
};

let getProjects = function(query) {
    let _root = search(query, 'name', 'en_us')[0];
    
};

hexo.extend.helper.register('md_all', function(site, page){
    //console.log(page.categories);
    //console.log(site.categories);
    let _en_us_root_category = search(site.categories, 'name', 'en_us')[0],
        _projects = search(site.categories, 'parent', _en_us_root_category._id),
        ret=[],
        posts,
        i,l,j,k,
        pt;

    for(i=0,l= _projects.length;i<l;i++) {
        posts = _projects[i].posts.sort('-date');
        k = posts.length;
        for(j=0;j<k;j++) {
            pt = posts.data[j];
            if(shortTitle(pt.slug).toUpperCase()!== 'README') { 
                ret.push(template_card
                    .replace('$title$', shortTitle(pt.slug))
                    .replace('$project$', _projects[i].name)
                    .replace('$desc$', _projects[i].excerpt || '')
                    .replace('$href$', pt.permalink));
                break;
            }
        }
        //console.log(_projects[i].posts);
    }
    return ret.join('');
    
});



hexo.extend.helper.register('md_find_index', function(site, page){
    console.log(page.categories);
});