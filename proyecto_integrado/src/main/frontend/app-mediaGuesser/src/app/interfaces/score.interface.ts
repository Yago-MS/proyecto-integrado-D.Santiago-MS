import {UserInterface} from "./user.interface";

export interface ScoreInterface {
  id?: number,
  date: Date,
  score: number,
  userId: number,
  user: UserInterface

  [key: string] : number | string | Date | UserInterface | undefined
}
