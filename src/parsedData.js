const parsedData = (data) => {
  try {
    const xmlData = data.contents;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
    const titleElement = xmlDoc.querySelector('channel title');
    const descriptionElement = xmlDoc.querySelector('channel description');
    const items = xmlDoc.querySelectorAll('channel item');
    const title = titleElement.textContent;
    const description = descriptionElement.textContent;
    const parsedItems = Array.from(items).map((item) => ({
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
    }));

    return { title, description, parsedItems };
  } catch (e) {
    throw new Error('notRss');
  }
};

export default parsedData;
