import { db } from "../database/database.connection.js";

export async function addCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const isRegistered = await db.query(
      `
                  SELECT * FROM customers WHERE customers.cpf=$1;
              `,
      [cpf]
    );
    if (isRegistered.rows[0]) return res.sendStatus(409);

    await db.query(`
            INSERT INTO customers (name,phone,cpf,birthday) VALUES ('${name}', '${phone}', '${cpf}', '${birthday}')
          `);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCustomer(req, res) {

    try {
        const customerList = await db.query(`
            SELECT * FROM customers
        `)
        res.status(200).send(customerList.rows)

    } catch (err) {
    res.status(500).send(err.message);
  }

}

export async function getCustomerById(req, res) {
    const { id } = req.params

    try {
        const customer = await db.query(`
            SELECT * FROM customers WHERE customers.id=$1;
        `, [id])
        if (customer.rows.length == 0) return res.sendStatus(404)

        res.send(customer.rows)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday} = req.body
    const { id } = req.params

    try {

        const customer = await db.query(`
            SELECT * FROM customers WHERE customers.id=$1;
        `, [id])

        const customerCpf = await db.query(`
            SELECT * FROM customers WHERE customers.cpf=$1;
        `, [cpf])

        if( customerCpf.rows[0]) {
        if( customer.rows[0].id !== customerCpf.rows[0].id) return res.sendStatus(409)}

        await db.query(`
            UPDATE customers
            SET name =$1, phone=$2, cpf=$3, birthday=$4
            WHERE customers.id =$5
        `, [name, phone, cpf, birthday, id])

        res.sendStatus(200)
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}
