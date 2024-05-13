export interface UserInterface{
  id: number,
  credential: string,
  max_score: number,
  name: string,
  typeId: number,
  profilePicUrl: string

  [key: string]: string | number
}
