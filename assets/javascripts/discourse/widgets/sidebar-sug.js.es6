import { createWidget } from 'discourse/widgets/widget';
import RawHtml from 'discourse/widgets/raw-html';

export default createWidget('sidebar-sug', {
  tagName: 'div.sidebar-sug',
  buildKey: () => 'sidebar-sug',

  html(attrs, state) {
  	if (!this.siteSettings.sidebar_enable || this.site.mobileView)
  	return;
	
	const result = [];
        var self = this;
     
	const { currentUser } = this; 
	if (currentUser) {
	
result.push( new RawHtml({ html: `<div class="sidebar-info">


</div>`}))   	
		
		
	}

    return result;
  },

});
