import {query} from './index'

const getAllMovements = async () => {
  return await query('SELECT * FROM movements');
};

const getMovementById = async (id: any) => {
  return await query('SELECT * FROM movements WHERE id = $1', [id]);
};

const createMovement = async (movement: { description: any; amount: any; date: any; account_id: any; }) => {
  return await query(
    'INSERT INTO movements (description, amount, date, account_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [movement.description, movement.amount, movement.date, movement.account_id]
  );
};

const updateMovement = async (movement: { description: any; amount: any; date: any; account_id: any; id: any; }) => {
  return await query(
    'UPDATE movements SET description = $1, amount = $2, date = $3, account_id = $4 WHERE id = $5 RETURNING *',
    [movement.description, movement.amount, movement.date, movement.account_id, movement.id]
  );
};

const deleteMovement = async (id: any) => {
  await query('DELETE FROM movements WHERE id = $1', [id]);
};

module.exports = {
  getAllMovements,
  getMovementById,
  createMovement,
  updateMovement,
  deleteMovement,
};