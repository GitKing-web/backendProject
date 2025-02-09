import { Router } from "express";
import { sayHola, handleSignUp, handleSignIn } from "../controllers/routes.controllers";
const router = Router()

router.get('/', sayHola)


//POST REQUESTS

router.post('/auth/register', handleSignUp)
router.post('/auth/signin', handleSignIn)




export default router