import {getLinks, saveLinks} from './feed-manager.mjs';

const feeds = await getLinks();

feeds.push('http://www.fehor.com');

await saveLinks(feeds);