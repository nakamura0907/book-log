import type { NextPage } from "next";
import React from "react";
import Layout from "@components/templates/Layout";
import Dashboard from "@features/bookshelf/routes/Dashboard";

const Home: NextPage = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Home;
