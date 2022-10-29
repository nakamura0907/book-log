import React from "react";
import Button from "@components/ui/button";
import Form from "@components/ui/form";
import message from "@components/ui/message";
import Upload from "@components/ui/upload";
import Select from "@components/ui/select";
import { UploadOutlined } from "@components/ui/icons";

export const convertStatusLabelToInt = (status: string) => {
  if (status == "読みたい") return 1;
  if (status == "いま読んでる") return 2;
  if (status == "読み終わった") return 3;
  return 0;
};
type BookStatusSelect = {
  label?: React.ReactNode;
  initialValue: any;
  withAll?: boolean;
};
export const BookStatusSelect: React.FC<BookStatusSelect> = ({
  label,
  initialValue,
  withAll,
}) => {
  return (
    <Form.Item label={label} name="status" initialValue={initialValue}>
      <Select>
        {withAll && <Select.Option value={"all"}>すべて</Select.Option>}
        <Select.Option value={0}>未設定</Select.Option>
        <Select.Option value={1}>読みたい</Select.Option>
        <Select.Option value={2}>いま読んでる</Select.Option>
        <Select.Option value={3}>読み終わった</Select.Option>
      </Select>
    </Form.Item>
  );
};

export const BookCoverUpload = () => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
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
  );
};
