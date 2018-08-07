import computed from 'ember-addons/ember-computed-decorators';

export default Ember.Component.extend({
  tagName: '',

 @computed('src')
  catTxt(src) {
   
    return Discourse.getURLWithCDN(src);

  }
  
});
