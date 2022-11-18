import { ObjectId } from 'mongodb'
import { INewGameBody } from '../payloads/INewGameBody'

export interface IGameDTO extends INewGameBody {
  id: number | ObjectId
}
