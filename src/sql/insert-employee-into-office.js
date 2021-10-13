const mssql = require('mssql');

async function insertEmployeeIntoOffice(pool, name, title) {
  const request = pool.request();
  request.input('NAME', mssql.VarChar, name);
  request.input('TITLE', mssql.VarChar, title);
  const queryString = 'INSERT INTO [DunderMifflin].[dbo].[scranton] ([name], [title]) VALUES (@NAME, @TITLE); SELECT SCOPE_IDENTITY() AS id;';
  const result = await request.query(queryString);
  return result?.recordset ?? [];
}

module.exports = insertEmployeeIntoOffice;
