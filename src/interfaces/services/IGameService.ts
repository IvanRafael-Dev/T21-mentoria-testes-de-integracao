import { IGameDTO } from '../models/IGameDTO'
import { INewGameBody } from '../payloads/INewGameBody'

export interface IGameService {
  create(game: INewGameBody): Promise<IGameDTO>
}
