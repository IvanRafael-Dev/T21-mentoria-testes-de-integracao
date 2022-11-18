import { IGameDTO } from './../models/IGameDTO'
import { INewGameBody } from './../payloads/INewGameBody'

export interface IGameRepository {
  create (obj: INewGameBody): Promise<IGameDTO>
}
