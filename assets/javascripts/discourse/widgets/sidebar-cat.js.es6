import { createWidget, applyDecorators } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import DiscourseURL from 'discourse/lib/url';
import { ajax } from 'discourse/lib/ajax';
import { NotificationLevels } from "discourse/lib/notification-levels";

const flatten = array => [].concat.apply([], array);

export default createWidget('sidebar-cat', {
  tagName: 'div.cat-panel',


   lookupCount(type) {
    const tts = this.register.lookup("topic-tracking-state:main");
    return tts ? tts.lookupCount(type) : 0;
  },

  showUserDirectory() {
    if (!this.siteSettings.enable_user_directory) return false;
    if (this.siteSettings.hide_user_profiles_from_public && !this.currentUser)
      return false;
    return true;
  },

  generalLinks() {
    const { siteSettings } = this;
    const links = [];


    links.push({
      route: "discovery.latest",
      className: "latest-topics-link",
      label: "filters.latest.title",
      title: "filters.latest.help",
      icon: "inbox"
    });

    if (this.currentUser) {
      links.push({
        route: "discovery.new",
        className: "new-topics-link",
        labelCount: "filters.new.title_with_count",
        label: "filters.new.title",
        title: "filters.new.help",
        count: this.lookupCount("new"),
      icon: "history"
      });

      links.push({
        route: "discovery.unread",
        className: "unread-topics-link",
        labelCount: "filters.unread.title_with_count",
        label: "filters.unread.title",
        title: "filters.unread.help",
        count: this.lookupCount("unread"),
      icon: "check-circle"
      });
    }

    links.push({
      route: "discovery.top",
      className: "top-topics-link",
      label: "filters.top.title",
      title: "filters.top.help",
      icon: "fire"
      
    });

     links.push({
      route: "discovery.categories",
      className: "top-cat",
      label: "filters.categories.title",
      title: "filters.categories.title",
      icon: "navicon"
      
    });

    const extraLinks = flatten(
      applyDecorators(this, "generalLinks", this.attrs, this.state)
    );
    return links.concat(extraLinks).map(l => this.attach("link", l));
},
 
  panelContents() {
    const { currentUser } = this;
    const results = [];

  
    results.push(
      this.attach("cat-panel", {
        name: "general-links",
        contents: () => this.generalLinks()
      })
    );


results.push(this.listCategories());

    return results;
  },
 

  listCategories() {
    const maxCategoriesToDisplay = this.siteSettings
      .header_dropdown_category_count;
    let categories = this.site.get("categoriesByCount");

    if (this.currentUser) {
      const allCategories = this.site
        .get("categories")
        .filter(c => c.notification_level !== NotificationLevels.MUTED);

      categories = allCategories
        .filter(c => c.get("newTopics") > 0 || c.get("unreadTopics") > 0)
        .sort((a, b) => {
          return (
            b.get("newTopics") +
            b.get("unreadTopics") -
            (a.get("newTopics") + a.get("unreadTopics"))
          );
        });

      const topCategoryIds = this.currentUser.get("top_category_ids") || [];
      topCategoryIds.forEach(id => {
        const category = allCategories.find(c => c.id === id);
        if (category && !categories.includes(category)) {
          categories.push(category);
        }
      });

      categories = categories.concat(
        allCategories
          .filter(c => !categories.includes(c))
          .sort((a, b) => b.topic_count - a.topic_count)
      );
    }

    const moreCount = categories.length - maxCategoriesToDisplay;
    categories = categories.slice(0, maxCategoriesToDisplay);

    return this.attach("cat-categories", { categories, moreCount });
},

  html() {
    return this.attach('cat-panel', { contents: () => this.panelContents() });
  },

});
