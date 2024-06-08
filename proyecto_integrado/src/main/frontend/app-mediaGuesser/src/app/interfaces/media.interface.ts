export interface MediaInterface {
  id?: number,
  name: string,
  releaseYear: number,
  typeId: number,
  imageUrl: string,

  [key: string]: number | string | undefined;
}
