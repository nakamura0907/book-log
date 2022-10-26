import React from "react";
import Button from "@components/ui/button";
import Divider from "@components/ui/divider";
import Input from "@components/ui/input";
import Rate from "@components/ui/rate";
import Form from "@components/ui/form";
import Image from "@components/ui/image";
import Upload from "@components/ui/upload";
import message from "@components/ui/message";
import Select from "@components/ui/select";
import removeBook from "../api/removeBook";
import { fetchById } from "../api/fetchById";
import { editBook } from "../api/editBook";
import { isAxiosError } from "@utils/axios";
import { useRouter } from "next/router";
import { UploadOutlined } from "@components/ui/icons";
import { BookDetail as BookDetailType } from "../types";

import styles from "../styles/index.module.css";

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
  }, []);

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
      const comment = values.comment;

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

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const convertStatusLabelToInt = (status: string) => {
    if (status == "読みたい") return 1;
    if (status == "いま読んでる") return 2;
    if (status == "読み終わった") return 3;
    return 0;
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
          <Divider />
        </>
      )}
      <div>
        {!isEditMode ? (
          <>
            <div className="not:last:mb-5">
              <span className="inline-block mb-1 text-lg font-bold">
                タイトル
              </span>
              <div>{book.title}</div>
            </div>
            <div className="not:last:mb-5">
              <span className="inline-block mb-1 text-lg font-bold">価格</span>
              <div>{book.price}</div>
            </div>
            <div className="not:last:mb-5">
              <span className="inline-block mb-1 text-lg font-bold">
                読書状況
              </span>
              <div>{book.status}</div>
            </div>
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
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="読書状況"
              name="status"
              initialValue={convertStatusLabelToInt(book.status)}
            >
              <Select>
                <Select.Option value={0}>未設定</Select.Option>
                <Select.Option value={1}>読みたい</Select.Option>
                <Select.Option value={2}>いま読んでいる</Select.Option>
                <Select.Option value={3}>読み終わった</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="表紙画像"
              name="coverImage"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                maxCount={1}
                listType="picture"
                beforeUpload={(file) => {
                  // ファイル拡張子のチェック
                  const isImage =
                    file.type === "image/jpeg" ||
                    file.type === "image/png" ||
                    file.type === "image/gif";
                  if (!isImage) {
                    message.error("画像ファイルを選択してください");
                    return Upload.LIST_IGNORE;
                  }

                  // ファイルサイズのチェック
                  const fileSize = file.size / 1024 / 1024;
                  if (fileSize > 2) {
                    message.error(
                      "アップロードできる画像のサイズは2MBまでです"
                    );
                    return Upload.LIST_IGNORE;
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>
                  表紙画像のアップロード
                </Button>
              </Upload>
            </Form.Item>
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
