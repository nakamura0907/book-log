import BookComment from "../value/BookComment";
import BookScore from "../value/BookScore";

class Review {
    private readonly _score: BookScore;
    private readonly _comment: BookComment;

    constructor(score: BookScore, comment: BookComment) {
        this._score = score;
        this._comment = comment;
    }

    static init() {
        return new Review(BookScore.UNSET, BookComment.EMPTY);
    }

    get score() {
        return this._score;
    }

    get comment() {
        return this._comment;
    }
}

export default Review;