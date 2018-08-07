import { registerUnbound } from 'discourse-common/lib/helpers';

var get = Em.get,
    escapeExpression = Handlebars.Utils.escapeExpression;

export function categoryBadgeHTML(category, opts) {
  opts = opts || {};

   if ((!category) ||
        (!opts.allowUncategorized &&
         Ember.get(category, 'id') === Discourse.Site.currentProp("uncategorized_category_id") &&
         Discourse.SiteSettings.suppress_uncategorized_badge
        )
   ) return "";   
    
  let categoryID = escapeExpression(get(category, 'id'));
  let img = Discourse.Category.findById(categoryID).uploaded_logo.url;
  let categoryName = escapeExpression(get(category, 'name'));
  let url = opts.url ? opts.url : Discourse.getURL("/c/") + Discourse.Category.slugFor(category); 
 
  return `<a class="catid-url" title="${categoryName}" href="${url}"><img src="${img}" alt="${categoryName}" class="catid-logo"></a>`;
}

export function categoryLinkHTML(category, options) {
  var categoryOptions = {};
  return new Handlebars.SafeString(categoryBadgeHTML(category, categoryOptions));
}

registerUnbound('catid-img', categoryLinkHTML);
