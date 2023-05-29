import _ from 'lodash';
import downloadFeed from './downloadFeed.js';
import parsedData from './parseData.js';

const checkFeeds = (state) => {
  const feedPromises = state.links.map((link) => downloadFeed(link.url, state)
    .then((data) => parsedData(data))
    .then((parsData) => {
      const newItems = _.differenceBy(parsData.parsedItems, state.items, 'title');

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
