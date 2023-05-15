import { db } from "../database/database.connection.js";

export async function addGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const isRegistered = await db.query(
      `
            SELECT * FROM games WHERE games.name=$1;
        `,
      [name]
    );
    if (isRegistered.rows[0]) return res.sendStatus(409);
    console.log(isRegistered.rows)

    const resGames = await db.query(`
            INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ('${name}', '${image}', ${stockTotal}, ${pricePerDay});
        `);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getGame(req, res) {
    try {

        const gamesList = await db.query(`
        SELECT * FROM games
        `)
        res.send(gamesList.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}
