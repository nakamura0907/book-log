import React from "react";
import Button from "@components/ui/button";
import Divider from "@components/ui/divider";
import Input from "@components/ui/input";
import Rate from "@components/ui/rate";
import Form from "@components/ui/form";
import { fetchById } from "../api/fetchById";
import { Image } from "antd";

import styles from "../styles/index.module.css";
import { editBook } from "../api/editBook";

type Book = {
  id: number;
  title: string;
  status: string;
  coverImage?: string;
  review: {
    score: number;
    comment?: string;
  };
};

type State = {
  book?: Book;
};

type Props = {
  bookId: string;
};

const initialState: State = {
  book: undefined,
};

export const BookDetail: React.FC<Props> = ({ bookId }) => {
  const [book, setBook] = React.useState(initialState.book);

  const [reviewForm] = Form.useForm();

  React.useEffect(() => {
    (async () => {
      const { data } = await fetchById(Number(bookId));
      setBook(data);
    })().catch((error) => {
      console.log(error);
    });
  }, []);

  const handleReviewSubmit = async (values: any) => {
    try {
      const score = values.score ?? 0;
      const comment = values.comment;

      const { data } = await editBook(Number(bookId), {
        score,
        comment,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!book) {
    return <></>;
  }
  return (
    <div>
      {book.coverImage && (
        <div className="overflow-hidden relative mb-7">
          <Image
            src={book.coverImage}
            wrapperClassName="absolute top-1/2 left-1/2 z-10 w-1/2 h-1/2 z-10"
            className="h-full object-contain"
            wrapperStyle={{
              transform: "translate(-50%, -50%)",
            }}
          />
          <Image
            src={book.coverImage}
            preview={false}
            wrapperStyle={{
              maxHeight: "400px",
              filter: "blur(10px) brightness(0.85)",
            }}
          />
        </div>
      )}
      <div className="flex">
        <Button danger className="ml-auto mr-5">
          本を削除する
        </Button>
        <Button type="primary">情報を修正する</Button>
      </div>
      <Divider />
      <div>
        <div className="not:last:mb-5">
          <span className="inline-block mb-1 text-lg font-bold">タイトル</span>
          <div>{book.title}</div>
        </div>
        <div className="not:last:mb-5">
          <span className="inline-block mb-1 text-lg font-bold">読書状況</span>
          <div>{book.status}</div>
        </div>
      </div>
      {/* 編集モードの場合、↑と入れ替えで編集フォームを表示する。追加時と同じ内容・見た目 */}
      <Divider />
      <Form form={reviewForm} onFinish={handleReviewSubmit}>
        <div className="not:last:mb-5">
          <span className="inline-block mb-1 text-lg font-bold">
            評価・感想
          </span>
          <div>
            <Form.Item noStyle name="score" initialValue={book.review.score}>
              <Rate className={styles.rate} />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              noStyle
              name="comment"
              initialValue={book.review.comment}
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </div>
        </div>
        <div>
          <Button type="primary" htmlType="submit" className="block ml-auto">
            レビューを保存する
          </Button>
        </div>
      </Form>
    </div>
  );
};
