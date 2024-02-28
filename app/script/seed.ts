const { Client } = require('@vercel/postgres');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  await client.query(`
    CREATE TABLE movements (
      id SERIAL PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      amount NUMERIC(10,2) NOT NULL,
      date DATE NOT NULL,
      account_id INTEGER REFERENCES accounts(id)
    );
  `);

  await client.query(`
    CREATE TABLE accounts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      balance NUMERIC(10,2) NOT NULL
    );
  `);

  await client.query(`
    INSERT INTO accounts (name, balance) VALUES
      ('Cuenta Corriente', 1000.00),
      ('Cuenta Ahorro', 500.00)
  `);

  await client.query(`
    INSERT INTO movements (description, amount, date, account_id) VALUES
      ('Compra en supermercado', -150.00, '2023-11-14', 1),
      ('Transferencia a cuenta ahorro', -200.00, '2023-11-15', 1),
      ('Depósito de nómina', 2500.00, '2023-11-16', 1),
      ('Pago de servicios', -100.00, '2023-11-17', 2)
  `);

  console.log('¡Datos de prueba insertados!');
}

seed().catch((error) => {
  console.error(error);
});