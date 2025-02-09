import { Router } from "express";
import { sayHola, handleSignUp } from "../controllers/routes.controllers";
const router = Router()

router.get('/', sayHola)


//POST REQUESTS

router.post('/auth/register', handleSignUp)





export default router