import { UserModel } from './../models/UserModel'
import { TokenServices } from './../utils/JWT/TokenServices'
import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { validateBody } from '../middleware/validateBody'
import { UserService } from '../service/UserService'
import { UserSequelizeRepository } from '../repository/sequelize/UserRepository'
import { validateToken } from '../middleware/validateToken'

const userSequelizeRepository = new UserSequelizeRepository()
const userModel = new UserModel(userSequelizeRepository)
const tokenServices = new TokenServices()
const userService = new UserService(userModel, tokenServices)
const userController = new UserController(userService)

const router = Router()

router
  .post('/users',
    validateBody(['email', 'username', 'password']),
    (req, res) => userController.create(req, res))
  .post('/login',
    validateBody(['email', 'password']),
    (req, res) => userController.login(req, res))
  .get('/users',
    validateToken,
    (req, res) => userController.getAll(req, res))

export { router as userRouter }
