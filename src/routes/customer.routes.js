import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { customerSchema } from "../schemas/customer.schema.js";
import { addCustomer, getCustomer, getCustomerById, updateCustomer } from "../controllers/customer.controller.js";

const customerRouter = Router()

customerRouter.post('/customers', validateSchema(customerSchema), addCustomer)
customerRouter.get('/customers', getCustomer)
customerRouter.get('/customers/:id', getCustomerById)
customerRouter.put('/customers/:id', validateSchema(customerSchema), updateCustomer)

export default customerRouter