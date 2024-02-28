import {query} from './index'

const getAllAccounts = async () => {
  return await query('SELECT * FROM accounts');
};

const getAccountById = async (id: any) => {
  return await query('SELECT * FROM accounts WHERE id = $1', [id]);
};

const createAccount = async (account: { name: any; balance: any; }) => {
  return await query(
    'INSERT INTO accounts (name, balance) VALUES ($1, $2) RETURNING *',
    [account.name, account.balance]
  );
};

const updateAccount = async (account: { name: any; balance: any; id: any; }) => {
  return await query(
    'UPDATE accounts SET name = $1, balance = $2 WHERE id = $3 RETURNING *',
    [account.name, account.balance, account.id]
  );
};

const deleteAccount = async (id: any) => {
  await query('DELETE FROM accounts WHERE id = $1', [id]);
};

module.exports = {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
};