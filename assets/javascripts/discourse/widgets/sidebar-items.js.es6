import { createWidget } from 'discourse/widgets/widget';
import RawHtml from 'discourse/widgets/raw-html';

export default createWidget('sidebar-items', {
  tagName: 'div.sidebar-items',
  buildKey: () => 'sidebar-items',

  html(attrs, state) {
  	if (!this.siteSettings.sidebar_enable || this.site.mobileView)
  	return;
	  
    const result = [];
    var self = this;
    const { currentUser } = this; 
    

    result.push(self.attach('sidebar-cat'));


      return result;
  },

});
