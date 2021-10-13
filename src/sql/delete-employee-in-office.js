const mssql = require('mssql');

async function deleteEmployeeInOffice(pool, name) {
  const request = pool.request();
  request.input('NAME', mssql.VarChar, name);
  const queryString = 'DELETE FROM [DunderMifflin].[dbo].[scranton] WHERE [NAME] = @NAME';
  const result = await request.query(queryString);
  return result?.recordset ?? [];
}

module.exports = deleteEmployeeInOffice;
