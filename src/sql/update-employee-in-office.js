const mssql = require('mssql');

async function updateEmployeeInOffice(pool, name, title) {
  const request = pool.request();
  request.input('NAME', mssql.VarChar, name);
  request.input('TITLE', mssql.VarChar, title);
  const queryString = 'UPDATE [DunderMifflin].[dbo].[scranton] SET [name] = @NAME, [title] = @TITLE WHERE [name] = @NAME';
  const result = await request.query(queryString);
  return result?.recordset ?? [];
}

module.exports = updateEmployeeInOffice;
