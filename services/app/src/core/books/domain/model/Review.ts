import Id from "@/core/shared/Id";
import BookScore from "../value/BookScore";

class Review {
  private readonly _id: Id;
  private readonly _score: BookScore;
  private readonly _comment?: string;

  constructor(id: Id, score: BookScore, comment?: string) {
    this._id = id;
    this._score = score;
    this._comment = comment;

    Object.freeze(this);
  }

  get id() {
    return this._id;
  }

  get score() {
    return this._score;
  }

  get comment() {
    return this._comment;
  }
}

export default Review;
