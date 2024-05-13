export interface MediaInterface {
  id?: number,
  name: string,
  releaseDate: Date,
  typeId: number,
  imageUrl: string,

  [key: string]: number | string | Date | undefined;
}
