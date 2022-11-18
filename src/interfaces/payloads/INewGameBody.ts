export interface INewGameBody {
  group: string
  teams: {
    team1: string
    team2: string
  }
  result: {
    team1: number
    team2: number
  }
  info: {
    stadium: string
    city: string
    date: Date
  }
}
