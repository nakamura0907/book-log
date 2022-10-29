type Book = {
  id: number;
  title: string;
  price: number;
  status: string;
  coverImage: string | undefined;
  createdAt: Date;
  updatedAt: Date;
};

type Review = {
  score: number;
  comment: string | undefined;
};

export type BookDetail = Book & {
  review: Review;
};
