import { IUser } from '../../service/UserService'

export interface IUserService {
  create (user: IUser): any
}