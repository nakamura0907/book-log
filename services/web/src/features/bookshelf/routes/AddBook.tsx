import Form from "@components/ui/form";
import Button from "@components/ui/button";
import message from "@components/ui/message";
import Input from "@components/ui/input";
import { UploadFile } from "@components/ui/upload";
import { useRouter } from "next/router";
import { addBook } from "../api/addBook";
import { isAxiosError } from "@utils/axios";
import { BookCoverUpload, BookStatusSelect } from "../components/form-field";

type FormInstanceValues = {
  title: string;
  price: number;
  status: number;
  coverImage?: UploadFile[];
};

export const AddBook = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormInstanceValues>();

  const handleFinish = async (values: FormInstanceValues) => {
    try {
      const { data } = await addBook({
        title: values.title,
        price: values.price,
        status: values.status,
        coverImage: values.coverImage
          ? values.coverImage[0].originFileObj
          : undefined,
      });

      const id = data.id;
      router.replace(`/bookshelf/${id}`);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status !== 500) {
        message.error(error.response?.data.message);
      } else {
        message.error("本の追加に失敗しました");
      }
      console.log(error);
    }
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="本のタイトル" name="title" required={true}>
          <Input />
        </Form.Item>
        <Form.Item label="本の価格" name="price" required={true}>
          <Input type="number" />
        </Form.Item>
        <BookStatusSelect label="読書状態" initialValue={0} />
        <BookCoverUpload />
        <Form.Item>
          <Button htmlType="submit" type="primary" className="block ml-auto">
            本棚に追加する
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
