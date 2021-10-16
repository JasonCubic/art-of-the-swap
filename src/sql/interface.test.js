const mssql = require('mssql');
const {
  createOfficeEmployee,
  readOfficeEmployees,
  updateOfficeEmployee,
  deleteOfficeEmployee,
} = require('./interface');

// https://jestjs.io/docs/jest-object#jestfnimplementation
const mockQuery = jest.fn();
const mockInput = jest.fn();
const mockRequest = jest.fn(() => ({
  query: mockQuery,
  input: mockInput,
}));

// https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options
jest.mock('./db', () => ({
  getPool: jest.fn(() => ({
    request: mockRequest,
  })),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('should create employee', async () => {
  const name = 'michael';
  const title = 'Regional Manager';
  await createOfficeEmployee(name, title);
  expect(mockRequest).toHaveBeenCalled();
  expect(mockInput).toHaveBeenCalledTimes(2);
  expect(mockInput).toHaveBeenCalledWith('NAME', mssql.VarChar, name);
  expect(mockInput).toHaveBeenCalledWith('TITLE', mssql.VarChar, title);
  expect(mockQuery).toHaveBeenCalled();
  expect(mockQuery).toHaveBeenCalledWith('INSERT INTO [DunderMifflin].[dbo].[scranton] ([name], [title]) VALUES (@NAME, @TITLE); SELECT SCOPE_IDENTITY() AS id;');
});

test('should read employee', async () => {
  await readOfficeEmployees();
  expect(mockRequest).toHaveBeenCalled();
  expect(mockInput).not.toHaveBeenCalled();
  expect(mockQuery).toHaveBeenCalled();
  expect(mockQuery).toHaveBeenCalledWith('SELECT [name], [title] FROM [DunderMifflin].[dbo].[scranton]');
});

test('should update employee', async () => {
  const name = 'andy';
  const title = 'Regional Director in Charge of Sales';
  await updateOfficeEmployee(name, title);
  expect(mockRequest).toHaveBeenCalled();
  expect(mockInput).toHaveBeenCalledTimes(2);
  expect(mockInput).toHaveBeenCalledWith('NAME', mssql.VarChar, name);
  expect(mockInput).toHaveBeenCalledWith('TITLE', mssql.VarChar, title);
  expect(mockQuery).toHaveBeenCalled();
  expect(mockQuery).toHaveBeenCalledWith('UPDATE [DunderMifflin].[dbo].[scranton] SET [name] = @NAME, [title] = @TITLE WHERE [name] = @NAME');
});

test('should delete employee', async () => {
  const name = 'toby';
  await deleteOfficeEmployee(name);
  expect(mockRequest).toHaveBeenCalled();
  expect(mockInput).toHaveBeenCalled();
  expect(mockInput).toHaveBeenCalledWith('NAME', mssql.VarChar, name);
  expect(mockQuery).toHaveBeenCalled();
  expect(mockQuery).toHaveBeenCalledWith('DELETE FROM [DunderMifflin].[dbo].[scranton] WHERE [NAME] = @NAME');
});

test('should throw an error on invalid name provided to createOfficeEmployee', async () => {
  await expect(createOfficeEmployee()).rejects.toThrow('invalid name');
  await expect(createOfficeEmployee(null)).rejects.toThrow('invalid name');
  await expect(createOfficeEmployee(123)).rejects.toThrow('invalid name');
  await expect(createOfficeEmployee({ name: 'name' })).rejects.toThrow('invalid name');
  await expect(createOfficeEmployee('')).rejects.toThrow('invalid name');
});

test('should throw an error on invalid name provided to updateOfficeEmployee', async () => {
  await expect(updateOfficeEmployee()).rejects.toThrow('invalid name');
  await expect(updateOfficeEmployee(null)).rejects.toThrow('invalid name');
  await expect(updateOfficeEmployee(123)).rejects.toThrow('invalid name');
  await expect(updateOfficeEmployee({ name: 'name' })).rejects.toThrow('invalid name');
  await expect(updateOfficeEmployee('')).rejects.toThrow('invalid name');
});

test('should throw an error on invalid name provided to deleteOfficeEmployee', async () => {
  await expect(deleteOfficeEmployee()).rejects.toThrow('invalid name');
  await expect(deleteOfficeEmployee(null)).rejects.toThrow('invalid name');
  await expect(deleteOfficeEmployee(123)).rejects.toThrow('invalid name');
  await expect(deleteOfficeEmployee({ name: 'name' })).rejects.toThrow('invalid name');
  await expect(deleteOfficeEmployee('')).rejects.toThrow('invalid name');
});

test('should throw an error on invalid title provided to createOfficeEmployee', async () => {
  await expect(createOfficeEmployee('jim')).rejects.toThrow('invalid title');
  await expect(createOfficeEmployee('jim', null)).rejects.toThrow('invalid title');
  await expect(createOfficeEmployee('jim', 123)).rejects.toThrow('invalid title');
  await expect(createOfficeEmployee('jim', { title: 'title' })).rejects.toThrow('invalid title');
  await expect(createOfficeEmployee('jim', '')).rejects.toThrow('invalid title');
});

test('should throw an error on invalid title provided to updateOfficeEmployee', async () => {
  await expect(createOfficeEmployee('pam')).rejects.toThrow('invalid title');
  await expect(createOfficeEmployee('pam', null)).rejects.toThrow('invalid title');
  await expect(createOfficeEmployee('pam', 123)).rejects.toThrow('invalid title');
  await expect(createOfficeEmployee('pam', { title: 'title' })).rejects.toThrow('invalid title');
  await expect(createOfficeEmployee('pam', '')).rejects.toThrow('invalid title');
});
