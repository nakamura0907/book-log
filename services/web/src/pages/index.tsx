import type { NextPage } from "next";
import Layout from "@components/templates/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div>ここに読書状態の件数を表示する</div>
      <div>ここに未読の値段を表示する</div>
    </Layout>
  );
};

export default Home;
