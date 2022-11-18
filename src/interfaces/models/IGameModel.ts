import { INewGameBody } from './../payloads/INewGameBody'
import { IGameDTO } from './IGameDTO'

export interface IGameModel {
  create (obg: INewGameBody): Promise<IGameDTO>
}
