const got = require('got');
const crypto = require('crypto');
const { lookupToken } = require('./interface');

// https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options
jest.mock('got');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should lookup a token', async () => {
  const tokenHeader = crypto.randomBytes(24).toString('hex');
  const expectedSampleResponse = {
    data: {
      accessor: '8609694a-cdbc-db9b-d345-e782dbb562ed',
      creation_time: 1523979354,
      creation_ttl: 2764800,
      display_name: 'ldap2-tesla',
      entity_id: '7d2e3179-f69b-450c-7179-ac8ee8bd8ca9',
      expire_time: '2018-05-19T11:35:54.466476215-04:00',
      explicit_max_ttl: 0,
      id: 'cf64a70f-3a12-3f6c-791d-6cef6d390eed',
      identity_policies: ['dev-group-policy'],
      issue_time: '2018-04-17T11:35:54.466476078-04:00',
      meta: {
        username: 'tesla',
      },
      num_uses: 0,
      orphan: true,
      path: 'auth/ldap2/login/tesla',
      policies: ['default', 'testgroup2-policy'],
      renewable: true,
      ttl: 2764790,
    },
  };
  // https://jestjs.io/docs/mock-function-api#mockfnmockimplementationfn
  got.mockImplementation((ajaxConfig) => new Promise((resolve, reject) => {
    if (ajaxConfig.method !== 'GET') {
      reject(new Error(`incorrect method: ${ajaxConfig.method}`));
      return;
    }
    if (ajaxConfig?.url !== 'http://127.0.0.1:8200/v0.1/auth/token/lookup-self') {
      reject(new Error(`incorrect url: ${ajaxConfig.url}`));
      return;
    }
    if (ajaxConfig?.headers?.['X-Vault-Token'] !== tokenHeader) {
      reject(new Error('X-Vault-Token header not set'));
      return;
    }
    resolve({
      body: JSON.parse(JSON.stringify(expectedSampleResponse)),
      statusCode: 200,
      statusMessage: 'OK',
      timings: [],
    });
  }));
  const results = await lookupToken(tokenHeader);
  expect(results.body).toEqual(expectedSampleResponse);
});
