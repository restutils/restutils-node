const _ = require('cleaner-node');

module.exports = data => {

  let items = [].concat(data).map(_.strings.cleanDigits).filter(_.strings.isValid);
  if (items.length === 0) { 
    return [];
  }

  items = items.map(item => ({
    digits: item,
    value : Number(item),
    zero  : (item === item.split('').filter(x => (x && x === '0')).join(''))
  }));

  let values = items.map(x => (x.value));
      values = _.numbers.unique(values);
      values = _.numbers.ascending(values);

  for (let i = 0; i < values.length; i += 1) {

    let set = items.filter(x => (x && x.value === values[i]));
    if (set.length === 0) {
      throw new Error('Invalid set length.');
    }

    if (set.length > 1) {

      const minLength = _.numbers.min(set.map(x => (x.digits.length)));
      set = [set.find(x => (x && x.digits.length === minLength))];

    }

    set[0].id = i;

  }

  return items;

};

