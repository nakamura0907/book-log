class BookDetail {
  public readonly id: number;
  public readonly title: string;
  public readonly price: number;
  public readonly status: string;
  public readonly coverImage: string | undefined;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly reviewScore: number;
  public readonly reviewComment: string | undefined;

  constructor(
    id: number,
    title: string,
    price: number,
    status: string,
    coverImage: string | undefined,
    createdAt: Date,
    updatedAt: Date,
    reviewScore: number,
    reviewComment: string | undefined
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.status = status;
    this.coverImage = coverImage;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.reviewScore = reviewScore;
    this.reviewComment = reviewComment;

    Object.freeze(this);
  }

  get response() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      status: this.status,
      coverImage: this.coverImage,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      review: {
        score: this.reviewScore,
        comment: this.reviewComment,
      },
    };
  }
}

export default BookDetail;
