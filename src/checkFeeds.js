import _ from 'lodash';
import downloadFeed from './downloadFeed.js';
import parseData from './parseData.js';

const checkFeeds = (state) => {
  const feedPromises = state.links.map((link) => downloadFeed(link.url)
    .then((data) => parseData(data))
    .then((parsedData) => {
      const newFeed = state.feeds.find((feed) => feed.title === parsedData.title
        && feed.description === parsedData.description);
      if (!newFeed) {
        const feedToAdd = {
          id: _.uniqueId(),
          title: parsedData.title,
          description: parsedData.description,
        };
        state.feeds.push(feedToAdd);
      }

      const newItems = _.differenceBy(parsedData.parsedItems, state.items, 'title');

      const itemsToAdd = newItems.map((newItem) => ({
        id: _.uniqueId(),
        title: newItem.title,
        description: newItem.description,
        link: newItem.link,
        parentsFeed: link.id,
      }));
      state.items.push(...itemsToAdd);
    }));

  Promise.all(feedPromises)
    .then(() => {
      setTimeout(() => checkFeeds(state), 5000);
    });
};

export default checkFeeds;
