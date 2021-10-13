const { getPool } = require('./db');
const insertEmployeeIntoOffice = require('./insert-employee-into-office');
const selectOfficeEmployees = require('./select-office-employees');
const updateEmployeeInOffice = require('./update-employee-in-office');
const deleteEmployeeInOffice = require('./delete-employee-in-office');

async function createOfficeEmployee(name, title) {
  if (!name || typeof name.valueOf() !== 'string' || name.length === 0) {
    throw new Error('invalid name');
  }
  if (!title || typeof title.valueOf() !== 'string' || title.length === 0) {
    throw new Error('invalid title');
  }
  const pool = await getPool();
  return insertEmployeeIntoOffice(pool, name, title);
}

async function readOfficeEmployees() {
  const pool = await getPool();
  return selectOfficeEmployees(pool);
}

async function updateOfficeEmployee(name, title) {
  if (!name || typeof name.valueOf() !== 'string' || name.length === 0) {
    throw new Error('invalid name');
  }
  if (!title || typeof title.valueOf() !== 'string' || title.length === 0) {
    throw new Error('invalid title');
  }
  const pool = await getPool();
  return updateEmployeeInOffice(pool, name, title);
}

async function deleteOfficeEmployee(name) {
  if (!name || typeof name.valueOf() !== 'string' || name.length === 0) {
    throw new Error('invalid name');
  }
  const pool = await getPool();
  return deleteEmployeeInOffice(pool, name);
}

module.exports = {
  createOfficeEmployee,
  readOfficeEmployees,
  updateOfficeEmployee,
  deleteOfficeEmployee,
};
