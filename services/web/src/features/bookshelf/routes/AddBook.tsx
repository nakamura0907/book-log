import Form from "@components/ui/form";
import Button from "@components/ui/button";
import Upload, { UploadFile } from "@components/ui/upload";
import message from "@components/ui/message";
import { UploadOutlined } from "@components/ui/icons";
import { useRouter } from "next/router";
import { addBook } from "../api/addBook";
import Input from "@components/ui/input";
import { isAxiosError } from "@utils/axios";
import Select from "@components/ui/select";

type FormInstanceValues = {
  title: string;
  status: number;
  coverImage?: {
    file: UploadFile;
    fileList: UploadFile[];
  };
};

export const AddBook = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormInstanceValues>();

  const handleFinish = async (values: FormInstanceValues) => {
    try {
      const { data } = await addBook({
        title: values.title,
        status: values.status,
        coverImage: values.coverImage?.file.originFileObj,
      });

      const id = data.id;
      router.replace(`/bookshelf/${id}`);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status !== 500) {
        message.error(error.response?.data.message);
      } else {
        message.error("本の追加に失敗しました");
      }
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="本のタイトル" name="title" required={true}>
          <Input />
        </Form.Item>
        <Form.Item label="読書状況" name="status" initialValue={0}>
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
                message.error("アップロードできる画像のサイズは2MBまでです");
                return Upload.LIST_IGNORE;
              }
            }}
          >
            <Button icon={<UploadOutlined />}>表紙画像のアップロード</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" className="block ml-auto">
            本棚に追加する
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
