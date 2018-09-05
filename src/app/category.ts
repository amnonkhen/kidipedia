
export class Category {
  id: string;
  name: string;
  isFavorite: boolean = false;
  pages: object = {};
  query?: object = {};
  image?:string;
}
