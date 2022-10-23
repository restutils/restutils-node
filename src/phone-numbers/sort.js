const _ = require('cleaner-node');

const clean = require('./clean');

module.exports = data => {

  const items = clean(data);
  if (items.length === 0) {
    return '';
  }

  let ids = items.map(x => (x.id));
      ids = _.numbers.ascending(ids);

  const results = [];

  ids.forEach(id => {

    const item  = items.find(x => (x && x.id === id));
    const value = item.zero ? '0' : item.digits;

    results.push(value);

  });

  return results.join(',');

};

