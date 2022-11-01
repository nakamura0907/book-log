import React from "react";
import Button from "@components/ui/button";
import Divider from "@components/ui/divider";
import Input from "@components/ui/input";
import Rate from "../components/rate";
import Form from "@components/ui/form";
import Image from "@components/ui/image";
import message from "@components/ui/message";
import removeBook from "../api/removeBook";
import { fetchById } from "../api/fetchById";
import { editBook } from "../api/editBook";
import { isAxiosError } from "@utils/axios";
import { useRouter } from "next/router";
import { BookDetail as BookDetailType } from "../types";
import BookInfoItem from "../components/book-info-item";
import {
  BookCoverUpload,
  BookStatusSelect,
  convertStatusLabelToInt,
} from "../components/form-field";

type State = {
  book?: BookDetailType;
  isEditMode: boolean;
};

type Props = {
  bookId: string;
};

const initialState: State = {
  book: undefined,
  isEditMode: false,
};

export const BookDetail: React.FC<Props> = ({ bookId }) => {
  const router = useRouter();

  const [book, setBook] = React.useState(initialState.book);
  const [isEditMode, setIsEditMode] = React.useState(initialState.isEditMode);

  const [editForm] = Form.useForm();
  const [reviewForm] = Form.useForm();

  React.useEffect(() => {
    (async () => {
      const { data } = await fetchById(Number(bookId));
      setBook(data);
    })().catch((error) => {
      if (isAxiosError(error) && error.response?.status != 500) {
        message.error(error.response?.data.message);
      } else {
        message.error("本の取得に失敗しました");
      }
    });
  }, [bookId]);

  const handleRemoveClick = async () => {
    if (confirm("本を削除しますか？")) {
      try {
        await removeBook(Number(bookId));
        router.replace("/bookshelf");
      } catch (error) {
        if (isAxiosError(error) && error.response?.status != 500) {
          message.error(error.response?.data.message);
        } else {
          message.error("本の削除に失敗しました");
        }
      }
    }
  };

  const handleEditSubmit = async (values: any) => {
    try {
      const { data } = await editBook(Number(bookId), {
        title: values.title,
        price: values.price,
        status: values.status,
        file: values.coverImage
          ? values.coverImage[0].originFileObj
          : undefined,
      });
      setBook(data);
      setIsEditMode(false);
    } catch (error) {
      console.log(error);
      if (isAxiosError(error) && error.response?.status != 500) {
        message.error(error.response?.data.message);
      } else {
        message.error("変更内容の保存に失敗しました");
      }
    }
  };

  const handleReviewSubmit = async (values: any) => {
    try {
      const score = values.score ?? 0;
      const comment = values.comment ?? "";

      const { data } = await editBook(Number(bookId), {
        score,
        comment,
      });
      setBook(data);
      message.success("レビューを保存しました");
    } catch (error) {
      if (isAxiosError(error) && error.response?.status != 500) {
        message.error(error.response?.data.message);
      } else {
        message.error("レビューに失敗しました");
      }
    }
  };

  if (!book) {
    return <></>;
  }
  return (
    <div>
      {book.coverImage && (
        <>
          <div className="overflow-hidden relative">
            <Image
              src={book.coverImage}
              alt={book.title}
              wrapperClassName="absolute top-1/2 left-1/2 z-10 w-1/2 h-1/2 z-10"
              className="h-full object-contain"
              wrapperStyle={{
                transform: "translate(-50%, -50%)",
              }}
            />
            <Image
              src={book.coverImage}
              alt={`${book.title} バックグラウンド`}
              preview={false}
              wrapperStyle={{
                maxHeight: "400px",
                filter: "blur(10px) brightness(0.85)",
              }}
              wrapperClassName="w-full"
            />
          </div>
          <Divider />
        </>
      )}
      <div>
        {!isEditMode ? (
          <>
            <BookInfoItem label="タイトル" body={book.title} />
            <BookInfoItem
              label="価格"
              body={`${book.price.toLocaleString()}円`}
            />
            <BookInfoItem label="読書状態" body={book.status} />
            <div className="flex">
              <Button
                danger
                className="ml-auto mr-5"
                onClick={handleRemoveClick}
              >
                本を削除する
              </Button>
              <Button onClick={() => setIsEditMode(true)}>
                情報を修正する
              </Button>
            </div>
          </>
        ) : (
          <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
            <Form.Item
              label="本のタイトル"
              name="title"
              initialValue={book.title}
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="本の価格"
              name="price"
              initialValue={book.price}
              required
            >
              <Input type="number" min={0} />
            </Form.Item>
            <BookStatusSelect
              label="読書状態"
              initialValue={convertStatusLabelToInt(book.status)}
            />
            <BookCoverUpload />
            <div className="flex">
              <Button
                className="ml-auto mr-5"
                onClick={() => {
                  setIsEditMode(false);
                  editForm.resetFields();
                }}
              >
                キャンセル
              </Button>
              <Button type="primary" htmlType="submit">
                編集内容の保存
              </Button>
            </div>
          </Form>
        )}
      </div>
      <Divider />
      <Form form={reviewForm} onFinish={handleReviewSubmit}>
        <BookInfoItem
          label="評価・感想"
          body={
            <>
              <div>
                <Form.Item
                  noStyle
                  name="score"
                  initialValue={book.review.score}
                >
                  <Rate />
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
            </>
          }
        />
        <div>
          <Button type="primary" htmlType="submit" className="block ml-auto">
            レビューを保存する
          </Button>
        </div>
      </Form>
    </div>
  );
};
