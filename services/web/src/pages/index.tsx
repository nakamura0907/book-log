import type { NextPage } from "next";
import React from "react";
import Layout from "@components/templates/Layout";
import { isAxiosError } from "@utils/axios";
import message from "@components/ui/message";
import fetchDashboard from "@features/bookshelf/api/fetchDashboard";
import Divider from "@components/ui/divider";
import Statistic from "@components/ui/statistic";

type State = {
  totalAmount: number;
  ratio: {
    read: number;
    total: number;
  };
};

const initialState: State = {
  totalAmount: 0,
  ratio: {
    read: 0,
    total: 0,
  },
};

const Home: NextPage = () => {
  const [totalAmount, setTotalAmount] = React.useState(
    initialState.totalAmount
  );
  const [ratio, setRatio] = React.useState(initialState.ratio);

  React.useEffect(() => {
    (async () => {
      const { data } = await fetchDashboard();
      const ratio = data.bookStatusRatio;

      setRatio({
        read: ratio.read,
        total: ratio.unread + ratio.reading,
      });
      setTotalAmount(data.notFinishedReadingTotalPrice);
    })().catch((error) => {
      if (isAxiosError(error) && error.response?.status !== 500) {
        message.error(error.response?.data.message);
      } else {
        message.error("ダッシュボードの取得に失敗しました");
      }
    });
  }, []);

  return (
    <Layout>
      <div>
        <Statistic
          title="読み終わった本の件数"
          formatter={(_) => {
            return `${ratio.read} / ${ratio.total}`;
          }}
          suffix="冊"
        />
      </div>
      <Divider />
      <div>
        <Statistic
          title="読み終わっていない本の合計金額"
          value={totalAmount}
          suffix={"円"}
        />
      </div>
    </Layout>
  );
};

export default Home;
