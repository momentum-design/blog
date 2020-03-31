let temp_language = `<a class="md-list-item $active$" role="listItem">$text$</a>`;
let LANGUAGES = {
    'de': 'Deutsch',
    'en_us':'English',
    'es': 'Espanol',
    'fr':'法Le français',
    'ja':'日本人',
    'ko':'한국어',
    'nl':'Nederlands',
    'no':'norsk språk',
    'pt':'Português',
    'ru':'русский',
    'zh_cn':'简体中文',
};

let temp_language_menu = `<div class="md-event-overlay__children" style="top: 60px; right: 20px;">
  <div class="md-menu md-menu-item-container" aria-label="" role="menubar">$content$</div>
</div>`;
let temp_language_menu_item = `<div class="md-menu-item" aria-expanded="false" aria-haspopup="false">
    <a href="$href$" aria-current="false" class="md-list-item" role="menuitem" tabindex="-1">$text$</a>
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


hexo.extend.helper.register('md_lang', function(site, page){
    //parent _id
    let query = page.categories,
        squery = site.categories,
        link = typeof page.permalink === 'string' ? page.permalink  : '#';
        ret=[];
    if(squery && query && query.length>1) {
        let thisLang = query.data[0].name,
            project = query.data[1],
            projects = search(squery, 'name', project.name),
            langs = {},
            lname,
            i,l;
        for(i=0,l= projects.length;i<l;i++) {
            let parent = search(squery, '_id', projects[i].parent);
            if (parent.length>0) {
                lname = parent[0].name;
                if (LANGUAGES[lname]) {
                    langs[lname] = LANGUAGES[lname];
                } else {
                    langs.en_us = 'English';
                }
            }
        }
        i=0;
        for(var name in  langs) {
            i++;
        }
        if(i>1) {
            for(var name in  langs) {
                ret.push(temp_language_menu_item
                    .replace('$text$', langs[name])
                    .replace('$href$', link.replace('/'+thisLang+'/', '/'+name+'/')));
            }
            return temp_language_menu.replace('$content$',ret.join(''));
        }
    }

    return '';
});