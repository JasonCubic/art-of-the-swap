const sellersArr = [
  'Meredith',
  'Kelly',
  'Kevin',
  'Phyllis',
  'Oscar',
  'Stanley',
  'Pam',
  'Ryan',
  'Creed',
  'Erin',
  'Angela',
  'Jim',
];

const itemArr = [
  'used candle',
  'telescope',
  'Jewelry',
  'Unusual and vintage clothes',
  'Small vintage glass bottles and vases',
  'Game consoles',
  'Vintage porcelain',
  'Animal horns',
  'Interesting candies lollipops and sweets',
  'Vintage clocks and hand watches',
  'Antiques',
  'Little plants in beautiful pots',
  'US Flags',
  'Handmade metal products',
  'Sculptures',
  'Sunglasses and vintage glasses',
  'Old and unique books',
  'Knives',
  'Swords, clubs, swords, bows, crossbows',
  'Wooden scary masks',
  'Metal plaques with inscriptions',
  'Tags',
  'Various wall decorations',
  'Artificial metal flowers',
  'Ornaments and figurines for the garden',
  'Printers',
  'Old coins and banknotes',
  'Bags',
  'Vintage lamps and kerosene lamps',
  'Multi-tools',
  'Hats, caps',
  'Paintings to hang on the wall',
  'Various small kitchen accessories',
  'Porcelain containers for cakes',
  'Small figures – toys',
  'Instruments',
  'Binoculars, telescopes',
  'Bikes',
  'Vintage serving trays',
  'Glass balls',
  'Video games',
  'Mugs',
  'Beautiful pins',
  'Toy cars',
  'Tools like screwdrivers, wrenches, chisels, hammers',
  'Fishing accessories',
  'Tablecloths',
  'Decorative spoons',
  'Cards',
  'Baseball bats',
  'Souvenirs from different countries',
];

function sortBy(fn) {
  return (a, b) => {
    const itemA = fn(a);
    const itemB = fn(b);
    if (itemA > itemB) {
      return 1;
    }
    if (itemA < itemB) {
      return -1;
    }
    return 0;
  };
}

function getRandomIntegerByRange(min, max) {
  return parseInt(Math.floor(Math.random() * (max - min + 2) + min).toFixed(0), 10);
}

function getRandomElementsInArr(arr, num = 1) {
  const haystack = [...arr];
  let results = [];
  for (let j = 0; j < num; j += 1) {
    const randomIndex = getRandomIntegerByRange(0, haystack.length - 1);
    const randomItem = haystack.splice(randomIndex, 1);
    results = results.concat(randomItem);
  }
  return results;
}

function setupNewSwapRound() {
  const sellerCount = getRandomIntegerByRange(3, 8);
  return getRandomElementsInArr(sellersArr, sellerCount).map((name) => {
    const itemCount = getRandomIntegerByRange(2, 3);
    return {
      name,
      gullibility: getRandomIntegerByRange(0, 500),
      items: getRandomElementsInArr(itemArr, itemCount).map((itemName) => ({
        itemName,
        estimatedValue: getRandomIntegerByRange(1, 10000),
      })),
    };
  });
}

function tableHaggle(table, customer) {
  let currentCustomerItem = customer.item;
  if (currentCustomerItem.estimatedValue === 0) {
    return { trades: [], currentCustomerItem };
  }
  const trades = [];
  const desiredTableItems = table.items.filter((item) => item.estimatedValue > currentCustomerItem.estimatedValue).sort(sortBy((obj) => obj.estimatedValue));
  for (let j = 0; j < desiredTableItems.length; j += 1) {
    if (currentCustomerItem.estimatedValue + customer.negotiationSkill > desiredTableItems[j].estimatedValue - table.gullibility) {
      // eslint-disable-next-line max-len
      trades.push(`${table.name} traded ${desiredTableItems[j].itemName} (${desiredTableItems[j].estimatedValue} Schrute Bucks) to ${customer.name} in exchange for ${currentCustomerItem.itemName} (${currentCustomerItem.estimatedValue} Schrute Bucks)`);
      currentCustomerItem = { itemName: desiredTableItems[j].itemName, estimatedValue: desiredTableItems[j].estimatedValue };
    }
  }
  if (customer.name.toLowerCase() === 'dwight' && table.name.toLowerCase() === 'jim') {
    const jimsTrickery = getRandomIntegerByRange(0, 100);
    const dwightsGullibility = getRandomIntegerByRange(0, 25);
    if (jimsTrickery > dwightsGullibility) {
      const itemName = "professor copperfield's miracle legumes";
      const estimatedValue = 0;
      // eslint-disable-next-line max-len
      trades.push(`${table.name} traded ${itemName} (${estimatedValue} Schrute Bucks) to ${customer.name} in exchange for ${currentCustomerItem.itemName} (${currentCustomerItem.estimatedValue} Schrute Bucks)`);
      currentCustomerItem = { itemName, estimatedValue };
    }
  }
  return { trades, currentCustomerItem };
}

function makeTheTradeRounds(customer, tables) {
  let roundTrades = [];
  const currentCustomer = { ...customer };
  for (let j = 0; j < tables.length; j += 1) {
    const { trades, currentCustomerItem } = tableHaggle(tables[j], currentCustomer);
    roundTrades = roundTrades.concat(trades);
    currentCustomer.item = currentCustomerItem;
  }
  return {
    roundTrades,
    customer: currentCustomer,
  };
}

function getRoundReport(startingCustomer, tradeRoundResults) {
  let messages = [];
  messages.push(`\n${startingCustomer.name} started with ${startingCustomer.item.itemName} (${startingCustomer.item.estimatedValue} Schrute Bucks)`);
  messages = messages.concat(tradeRoundResults.roundTrades);
  messages.push(`${startingCustomer.name} ended with ${tradeRoundResults.customer.item.itemName} (${tradeRoundResults.customer.item.estimatedValue} Schrute Bucks)`);
  if (tradeRoundResults.roundTrades.length === 0) {
    messages.push(`${startingCustomer.name} was unable to make any trades`);
  }
  const estimatedValueAdded = tradeRoundResults.customer.item.estimatedValue - startingCustomer.item.estimatedValue;
  if (estimatedValueAdded < 0) {
    // eslint-disable-next-line max-len
    messages.push(`\n${startingCustomer.name} was tricked into swapping for ${tradeRoundResults.customer.item.itemName} (${tradeRoundResults.customer.item.estimatedValue} Schrute Bucks)`);
  } else if (estimatedValueAdded === 0) {
    messages.push(`\n${startingCustomer.name} was not able to prove his swapping prowess.`);
  } else if (estimatedValueAdded > 5000) {
    messages.push(`\nThings went very well. ${startingCustomer.name} has proven he has expert swapping prowess.`);
  } else {
    messages.push(`\n${startingCustomer.name} did not do as well at the art of the swap as he would have liked.  Next time he will be more prepared!`);
  }
  return {
    messages,
    totalTrades: tradeRoundResults.roundTrades.length,
    estimatedValueAdded,
    finalItem: tradeRoundResults.customer.item,
  };
}

function playArtOfTheSwap(name, itemName, estimatedValue) {
  const customer = {
    name,
    negotiationSkill: getRandomIntegerByRange(0, 10000),
    item: {
      itemName,
      estimatedValue,
    },
  };
  const swapRoundRandomTableSetup = setupNewSwapRound();
  const roundResults = makeTheTradeRounds(customer, swapRoundRandomTableSetup);
  const roundReport = getRoundReport(customer, roundResults);
  for (let j = 0; j < roundReport.messages.length; j += 1) {
    console.log(roundReport.messages[j]);
  }
}

module.exports = {
  sortBy,
  getRandomIntegerByRange,
  getRandomElementsInArr,
  setupNewSwapRound,
  tableHaggle,
  makeTheTradeRounds,
  getRoundReport,
  playArtOfTheSwap,
};
