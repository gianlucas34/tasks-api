import express from 'express'
import { signInRoute } from './sign-in'

const router = express.Router()

router.post('/signin', signInRoute)

export const AuthRoutes = router
