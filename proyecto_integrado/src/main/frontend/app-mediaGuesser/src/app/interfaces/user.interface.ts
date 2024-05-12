export interface UserInterface{
  id: number,
  credential: string,
  max_score: number,
  name: string,
  type_id: number,
  profilePicUrl: string

  [key: string]: string | number
}
