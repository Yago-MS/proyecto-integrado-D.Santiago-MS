export interface ScoreInterface {
  id: number,
  date: Date,
  score: number,
  userId: number,

  [key: string] : number | string | Date
}
