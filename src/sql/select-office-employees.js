async function selectOfficeEmployees(pool) {
  const request = pool.request();
  const selectQueryString = 'SELECT [name], [title] FROM [DunderMifflin].[dbo].[scranton]';
  const result = await request.query(selectQueryString);
  return result?.recordset ?? [];
}

module.exports = selectOfficeEmployees;
