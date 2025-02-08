import { Router } from "express";
import { sayHola } from "../controllers/routes.controllers";
const router = Router()

router.get('/', sayHola)






export default router