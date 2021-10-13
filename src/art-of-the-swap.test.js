const {
  sortBy,
  getRandomIntegerByRange,
  getRandomElementsInArr,
  setupNewSwapRound,
  tableHaggle,
  makeTheTradeRounds,
} = require('./art-of-the-swap');

describe('helper functions', () => {
  test('should sort a collection by user for sortBy', () => {
    const sortedArr = [{ user: 'fred', age: 48 }, { user: 'wilma', age: 36 }, { user: 'betty', age: 40 }, { user: 'barney', age: 34 }].sort(sortBy((obj) => obj.user));
    expect(sortedArr).toEqual([{ user: 'barney', age: 34 }, { user: 'betty', age: 40 }, { user: 'fred', age: 48 }, { user: 'wilma', age: 36 }]);
  });

  test('should monkey patch and get 0 for getRandomIntegerByRange', () => {
    const preMonkeyPatch = Math.random;
    Math.random = () => 0;
    const notSoRandomInt = getRandomIntegerByRange(0, 12);
    expect(notSoRandomInt).toStrictEqual(0);
    Math.random = preMonkeyPatch;
  });

  test('should mock and get 12 for getRandomIntegerByRange', () => {
    const randomMock = jest.spyOn(Math, 'random');
    randomMock.mockImplementation(() => 0.9999999);
    const notSoRandomInt = getRandomIntegerByRange(0, 12);
    randomMock.mockRestore();
    expect(notSoRandomInt).toStrictEqual(12);
  });

  test('should get first 2 elements in array', () => {
    const randomMock = jest.spyOn(Math, 'random');
    randomMock.mockImplementation(() => 0);
    const results = getRandomElementsInArr(['first', 'second', 'third'], 2);
    randomMock.mockRestore();
    expect(results).toEqual(['first', 'second']);
  });

  test('should get last 2 elements in array', () => {
    const randomMock = jest.spyOn(Math, 'random');
    randomMock.mockImplementation(() => 0.9999999);
    const results = getRandomElementsInArr(['first', 'second', 'third'], 2);
    randomMock.mockRestore();
    expect(results).toEqual(['third', 'second']);
  });
});

describe('art of the swap interactions', () => {
  test('should get lowest possible setupNewSwapRound', () => {
    const randomMock = jest.spyOn(Math, 'random');
    randomMock.mockImplementation(() => 0);
    const results = setupNewSwapRound();
    randomMock.mockRestore();
    expect(results).toEqual([
      {
        name: 'Meredith',
        gullibility: 0,
        items: [
          {
            itemName: 'used candle',
            estimatedValue: 1,
          },
          {
            itemName: 'telescope',
            estimatedValue: 1,
          },
        ],
      },
      {
        name: 'Kelly',
        gullibility: 0,
        items: [
          {
            itemName: 'used candle',
            estimatedValue: 1,
          },
          {
            itemName: 'telescope',
            estimatedValue: 1,
          },
        ],
      },
      {
        name: 'Kevin',
        gullibility: 0,
        items: [
          {
            itemName: 'used candle',
            estimatedValue: 1,
          },
          {
            itemName: 'telescope',
            estimatedValue: 1,
          },
        ],
      },
    ]);
  });

  test('should get highest possible setupNewSwapRound', () => {
    const randomMock = jest.spyOn(Math, 'random');
    randomMock.mockImplementation(() => 0.9999999);
    const results = setupNewSwapRound();
    randomMock.mockRestore();
    expect(results).toEqual([
      {
        name: 'Jim',
        gullibility: 500,
        items: [
          {
            itemName: 'Souvenirs from different countries',
            estimatedValue: 10000,
          },
          {
            itemName: 'Baseball bats',
            estimatedValue: 10000,
          },
          {
            itemName: 'Cards',
            estimatedValue: 10000,
          },
        ],
      },
      {
        name: 'Angela',
        gullibility: 500,
        items: [
          {
            itemName: 'Souvenirs from different countries',
            estimatedValue: 10000,
          },
          {
            itemName: 'Baseball bats',
            estimatedValue: 10000,
          },
          {
            itemName: 'Cards',
            estimatedValue: 10000,
          },
        ],
      },
      {
        name: 'Erin',
        gullibility: 500,
        items: [
          {
            itemName: 'Souvenirs from different countries',
            estimatedValue: 10000,
          },
          {
            itemName: 'Baseball bats',
            estimatedValue: 10000,
          },
          {
            itemName: 'Cards',
            estimatedValue: 10000,
          },
        ],
      },
      {
        name: 'Creed',
        gullibility: 500,
        items: [
          {
            itemName: 'Souvenirs from different countries',
            estimatedValue: 10000,
          },
          {
            itemName: 'Baseball bats',
            estimatedValue: 10000,
          },
          {
            itemName: 'Cards',
            estimatedValue: 10000,
          },
        ],
      },
      {
        name: 'Ryan',
        gullibility: 500,
        items: [
          {
            itemName: 'Souvenirs from different countries',
            estimatedValue: 10000,
          },
          {
            itemName: 'Baseball bats',
            estimatedValue: 10000,
          },
          {
            itemName: 'Cards',
            estimatedValue: 10000,
          },
        ],
      },
      {
        name: 'Pam',
        gullibility: 500,
        items: [
          {
            itemName: 'Souvenirs from different countries',
            estimatedValue: 10000,
          },
          {
            itemName: 'Baseball bats',
            estimatedValue: 10000,
          },
          {
            itemName: 'Cards',
            estimatedValue: 10000,
          },
        ],
      },
      {
        name: 'Stanley',
        gullibility: 500,
        items: [
          {
            itemName: 'Souvenirs from different countries',
            estimatedValue: 10000,
          },
          {
            itemName: 'Baseball bats',
            estimatedValue: 10000,
          },
          {
            itemName: 'Cards',
            estimatedValue: 10000,
          },
        ],
      },
      {
        name: 'Oscar',
        gullibility: 500,
        items: [
          {
            itemName: 'Souvenirs from different countries',
            estimatedValue: 10000,
          },
          {
            itemName: 'Baseball bats',
            estimatedValue: 10000,
          },
          {
            itemName: 'Cards',
            estimatedValue: 10000,
          },
        ],
      },
    ]);
  });

  test('should refuse trades if item is worth zero Schrute bucks for tableHaggle', () => {
    const table = {
      name: 'Pam',
      gullibility: 164,
      items: [
        { itemName: 'Tags', estimatedValue: 2852 },
        {
          itemName: 'Ornaments and figurines for the garden',
          estimatedValue: 9593,
        },
        { itemName: 'Beautiful pins', estimatedValue: 1091 },
      ],
    };
    const customer = {
      name: 'Dwight',
      negotiationSkill: 6478,
      item: { itemName: "professor copperfield's miracle legumes", estimatedValue: 0 },
    };
    const results = tableHaggle(table, customer);
    expect(results).toEqual({
      trades: [],
      currentCustomerItem: {
        itemName: "professor copperfield's miracle legumes",
        estimatedValue: 0,
      },
    });
  });

  test('should trade and not get tricked by jim for tableHaggle', () => {
    const table = {
      name: 'Jim',
      gullibility: 164,
      items: [
        { itemName: 'Tags', estimatedValue: 2852 },
        {
          itemName: 'Ornaments and figurines for the garden',
          estimatedValue: 9593,
        },
        { itemName: 'Beautiful pins', estimatedValue: 1091 },
      ],
    };
    const customer = {
      name: 'Dwight',
      negotiationSkill: 6478,
      item: { itemName: 'Tools like screwdrivers, wrenches, chisels, hammers', estimatedValue: 2000 },
    };
    const randomMock = jest.spyOn(Math, 'random');
    randomMock.mockImplementation(() => 0);
    const results = tableHaggle(table, customer);
    randomMock.mockRestore();
    expect(results).toEqual({
      trades: [
        'Jim traded Tags (2852 Schrute Bucks) to Dwight in exchange for Tools like screwdrivers, wrenches, chisels, hammers (2000 Schrute Bucks)',
      ],
      currentCustomerItem: {
        itemName: 'Tags',
        estimatedValue: 2852,
      },
    });
  });

  test('should trade and get tricked by jim for tableHaggle', () => {
    const table = {
      name: 'Jim',
      gullibility: 164,
      items: [
        { itemName: 'Tags', estimatedValue: 2852 },
        {
          itemName: 'Ornaments and figurines for the garden',
          estimatedValue: 9593,
        },
        { itemName: 'Beautiful pins', estimatedValue: 1091 },
      ],
    };
    const customer = {
      name: 'Dwight',
      negotiationSkill: 6478,
      item: { itemName: 'Tools like screwdrivers, wrenches, chisels, hammers', estimatedValue: 2000 },
    };
    const randomMock = jest.spyOn(Math, 'random');
    randomMock.mockImplementation(() => 0.9999999);
    const results = tableHaggle(table, customer);
    randomMock.mockRestore();
    expect(results).toEqual({
      trades: [
        'Jim traded Tags (2852 Schrute Bucks) to Dwight in exchange for Tools like screwdrivers, wrenches, chisels, hammers (2000 Schrute Bucks)',
        "Jim traded professor copperfield's miracle legumes (0 Schrute Bucks) to Dwight in exchange for Tags (2852 Schrute Bucks)",
      ],
      currentCustomerItem: {
        itemName: "professor copperfield's miracle legumes",
        estimatedValue: 0,
      },
    });
  });

  test('should trade through all items for makeTheTradeRounds', () => {
    const customer = {
      name: 'Dwight',
      negotiationSkill: 150,
      item: { itemName: 'Thumb Tac', estimatedValue: 1 },
    };
    const tables = [
      {
        name: 'Meredith',
        gullibility: 100,
        items: [
          {
            itemName: 'used candle',
            estimatedValue: 100,
          },
          {
            itemName: 'telescope',
            estimatedValue: 200,
          },
        ],
      },
      {
        name: 'Kelly',
        gullibility: 100,
        items: [
          {
            itemName: 'Knives',
            estimatedValue: 300,
          },
          {
            itemName: 'Wooden scary masks',
            estimatedValue: 400,
          },
        ],
      },
      {
        name: 'Kevin',
        gullibility: 100,
        items: [
          {
            itemName: 'Printers',
            estimatedValue: 500,
          },
          {
            itemName: 'Multi-tools',
            estimatedValue: 600,
          },
        ],
      },
    ];
    const randomMock = jest.spyOn(Math, 'random');
    randomMock.mockImplementation(() => 0);
    const results = makeTheTradeRounds(customer, tables);
    randomMock.mockRestore();
    expect(results).toEqual({
      roundTrades: [
        'Meredith traded used candle (100 Schrute Bucks) to Dwight in exchange for Thumb Tac (1 Schrute Bucks)',
        'Meredith traded telescope (200 Schrute Bucks) to Dwight in exchange for used candle (100 Schrute Bucks)',
        'Kelly traded Knives (300 Schrute Bucks) to Dwight in exchange for telescope (200 Schrute Bucks)',
        'Kelly traded Wooden scary masks (400 Schrute Bucks) to Dwight in exchange for Knives (300 Schrute Bucks)',
        'Kevin traded Printers (500 Schrute Bucks) to Dwight in exchange for Wooden scary masks (400 Schrute Bucks)',
        'Kevin traded Multi-tools (600 Schrute Bucks) to Dwight in exchange for Printers (500 Schrute Bucks)',
      ],
      customer: {
        name: 'Dwight',
        negotiationSkill: 150,
        item: {
          itemName: 'Multi-tools',
          estimatedValue: 600,
        },
      },
    });
  });
});
