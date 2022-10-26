export type BookDetail = {
  id: number;
  title: string;
  price: number;
  status: string;
  coverImage: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  review: {
    score: number;
    comment: string | undefined;
  };
};
