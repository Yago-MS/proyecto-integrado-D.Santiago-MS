export interface UserInterface{
  id: number,
  credential: string,
  maxScore: number,
  name: string,
  typeId: number,
  imageUrl: string

  [key: string]: string | number
}
