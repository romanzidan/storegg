export interface CategoryTypes{
  _id: string;
  name: string;
}

export interface GameItemTypes{
  _id: string;
  status: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}
