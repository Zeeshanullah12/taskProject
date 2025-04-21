import { Router } from "express";
import user from "./user";
import auth from "./user/auth"

const router = Router()

router.use('/user', user)
router.use('/auth', auth)

export default router