import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';


createWidget('cat-panel', {
  tagName: 'div.cat-panel',


  html(attrs) {
  
    const links = [].concat(attrs.contents());
    const liOpts = {};

    if (attrs.heading) {
      liOpts.className = "header";
    }

    const result = [];
        
     
    result.push(
      h("div.menu-link", links.map(l => h("div", liOpts, l)))
    );
  
  
    return h('div.menu-body', h('div.my-menu', attrs.contents()));

  }
});
