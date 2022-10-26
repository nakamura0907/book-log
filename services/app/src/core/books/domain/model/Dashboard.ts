type BookStatusRatio = {
  unread: number;
  reading: number;
  read: number;
};

class Dashboard {
  private readonly _bookStatusRatio: BookStatusRatio;
  private readonly _notFinishedReadingTotalPrice: number;

  constructor(
    bookStatusRatio: BookStatusRatio,
    notFinishedReadingTotalPrice: number
  ) {
    this._bookStatusRatio = bookStatusRatio;
    this._notFinishedReadingTotalPrice = notFinishedReadingTotalPrice;
  }

  get bookStatusRatio(): BookStatusRatio {
    return this._bookStatusRatio;
  }

  get notFinishedReadingTotalPrice(): number {
    return this._notFinishedReadingTotalPrice;
  }
}

export default Dashboard;
