import React from "react";
import AntLayout from "@components/ui/layout";
import Head from "next/head";
import Link from "@components/ui/link";
import Dropdown from "@components/ui/dropdown";
import Menu from "@components/ui/menu";
import { Row, Col } from "@components/ui/grid";
import { DownOutlined } from "@components/ui/icons";
import Space from "@components/ui/space";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: <Link href="/bookshelf/register">新しい本の追加</Link>,
      },
      {
        key: "2",
        label: <Link href="/bookshelf">マイ本棚</Link>,
      },
    ]}
  />
);

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Book Log | 積み本防止アプリ</title>
      </Head>
      <AntLayout className="min-h-screen tracking-widest">
        <AntLayout.Header>
          <Row>
            <Col>
              <h1>
                <Link href="/">
                  <a className="text-white">Book Log</a>
                </Link>
              </h1>
            </Col>
            <Col className="ml-auto">
              <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Menu
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Col>
          </Row>
        </AntLayout.Header>
        <AntLayout.Content className="px-4 mx-auto w-full max-w-2xl">
          {children}
        </AntLayout.Content>
        <AntLayout.Footer>
          <small className="block text-center">
            &copy; Copyright. All rights reserved.
          </small>
        </AntLayout.Footer>
      </AntLayout>
    </>
  );
};

export default Layout;
