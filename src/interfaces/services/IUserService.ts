import User from '../../database/entities/User'
import { IUserDTO } from '../models/IUserDTO'
import { ILogin } from '../payloads/ILogin'
import { INewUserBody } from '../payloads/INewUserBody'

export interface IUserService {
  create (user: INewUserBody): Promise<IUserDTO>
  login (login: ILogin): Promise<string>
  getAll (): Promise<User[]>

}
