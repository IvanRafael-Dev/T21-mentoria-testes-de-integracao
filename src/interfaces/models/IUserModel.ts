import { IUserEntity } from './IUserEntity'
import { INewUserBody } from '../payloads/INewUserBody'
import { IUserDTO } from './IUserDTO'
import User from '../../database/entities/User'

export interface IUserModel {
  create (user: INewUserBody): Promise<IUserDTO>
  findByEmail (email: string): Promise<IUserEntity | null>
  getAll (): Promise<User[]>
}
