import { registerUnbound } from 'discourse-common/lib/helpers';

registerUnbound('topic-link', (topic, args) => {
  const title = topic.get('fancyTitle');
  const url = topic.linked_post_number ?
    topic.urlForPostNumber(topic.linked_post_number) :
    topic.get('lastUnreadUrl');

  const classes = ['title'];
  const trags = [''];
  const rels = ['noopener'];
  if (args.class) {
    args.class.split(" ").forEach(c => classes.push(c));
  }

  if (args.target) {
    args.target.split(" ").forEach(c => trags.push(c));
  }

  if (args.rel) {
    args.rel.split(" ").forEach(c => rels.push(c));
  }
  
  const result = `<a href='${url}' rel='${rels.join(' ')}' target='${trags.join('')}' class='${classes.join(' ')}'>${title}</a>`;
  return new Handlebars.SafeString(result);
});
