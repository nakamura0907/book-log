import React from "react";
import Image from "@components/ui/image";
import List from "@components/ui/list";
import Skeleton from "@components/ui/skeleton";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import message from "@components/ui/message";
import Form from "@components/ui/form";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import Select from "@components/ui/select";
import Rate from "../components/rate";
import { fetchList, FetchListDTO } from "../api/fetchList";
import { BookDetail } from "../types";
import { isAxiosError } from "@utils/axios";
import { BookStatusSelect } from "../components/form-field";

type Options = Omit<FetchListDTO, "skip">;

type State = {
  isLoading: boolean;
  hasMore: boolean;
  data: BookDetail[];
  options: Options;
};

const initialState: State = {
  isLoading: false,
  hasMore: true,
  data: [],
  options: {
    order: "-updatedAt",
    query: undefined,
    status: undefined,
  },
};

export const BookshelfList = () => {
  const [isLoading, setIsLoading] = React.useState(initialState.isLoading);
  const [hasMore, setHasMore] = React.useState(initialState.hasMore);
  const [data, setData] = React.useState(initialState.data);
  const [options, setOptions] = React.useState(initialState.options);

  const [form] = Form.useForm();

  const loadMoreData = async (skip: number, options?: Options) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetchList({
        skip,
        ...options,
      });
      setData((prev) => [...prev, ...response.data.books]);

      if (response.data.isEnd) setHasMore(false);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status != 500) {
        message.error(error.response?.data.message);
      } else {
        message.error("本の取得に失敗しました");
      }
    }

    setIsLoading(false);
  };

  const handleSubmit = (values: any) => {
    setData(initialState.data);
    setHasMore(initialState.hasMore);

    const option = {
      ...values,
      status: values.status === "all" ? undefined : values.status,
    };
    setOptions(option);
    loadMoreData(initialState.data.length, option);
  };

  React.useEffect(() => {
    loadMoreData(initialState.data.length);
  }, []);

  return (
    <div>
      <Form form={form} onFinish={handleSubmit}>
        <div className="flex">
          <Form.Item name="query" noStyle>
            <Input placeholder="React.jsの教科書" />
          </Form.Item>
          <Form.Item noStyle>
            <Button htmlType="submit">検索</Button>
          </Form.Item>
        </div>
        <Form.Item name="order" initialValue={options.order} className="mb-0">
          <Select>
            <Select.Option value="-updatedAt">更新順</Select.Option>
            <Select.Option value="-createdAt">新しい順</Select.Option>
            <Select.Option value="createdAt">古い順</Select.Option>
            <Select.Option value="-score">高評価順</Select.Option>
            <Select.Option value="-price">価格が高い順</Select.Option>
            <Select.Option value="price">価格が安い順</Select.Option>
          </Select>
        </Form.Item>
        <BookStatusSelect initialValue={"all"} withAll />
      </Form>
      <div
        id="scrollable"
        style={{
          overflow: "auto",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={() => loadMoreData(data.length, options)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollable"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <Link href={`/bookshelf/${item.id}`}>
                <a>
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        item.coverImage ? (
                          <Image
                            src={item.coverImage}
                            height={100}
                            width={80}
                            preview={false}
                          />
                        ) : (
                          <Skeleton.Image style={{ width: 80, height: 100 }} />
                        )
                      }
                      title={item.title}
                      description={
                        <div>
                          <Rate disabled defaultValue={item.review.score} />
                          <div>
                            {item.price.toLocaleString()}円 / {item.status}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                </a>
              </Link>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};
