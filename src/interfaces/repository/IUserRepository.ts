import { IUserEntity } from './../models/IUserEntity'
import { IUserDTO } from '../models/IUserDTO'
import { INewUserBody } from '../payloads/INewUserBody'
import User from '../../database/entities/User'

export interface IUserRepository {
  create (user: INewUserBody): Promise<IUserDTO>
  findByEmail(email: string): Promise<IUserEntity | null>
  getAll (): Promise<User[]>

}
