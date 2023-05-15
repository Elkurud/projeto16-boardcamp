import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { deleteRental } from "../controllers/rentals.controller.js";

const rentalRouter = Router()

rentalRouter.delete("/rentals/:id", deleteRental)

export default rentalRouter