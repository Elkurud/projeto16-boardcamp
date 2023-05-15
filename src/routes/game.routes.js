import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { gameSchema } from "../schemas/games.schema.js";
import { addGame, getGame } from "../controllers/game.controller.js";

const gameRouter = Router()

gameRouter.post("/games", validateSchema(gameSchema), addGame)
gameRouter.get("/games", getGame)

export default gameRouter