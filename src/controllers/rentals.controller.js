import { db } from "../database/database.connection.js";



export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    const rental = await db.query(
    `
        SELECT * FROM rentals WHERE rentals.id=$1;
    `,
    [id]
  );

    if(rental.rows.length < 1) return res.sendStatus(404)
    if(!rental.rows[0].returnDate) return res.sendStatus(400)

    await db.query(`
        DELETE FROM rentals WHERE rentals.id=$1;
    `, [id])
    res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }
}
