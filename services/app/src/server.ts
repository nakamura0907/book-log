import cors from "cors";
import http from "http";
import express from "express";
import config from "@config/index";
import errorHandling from "@middlewares/errorHandling";
import booksRouter from "@/core/interface/router/books";

const app = express();
const server = http.createServer(app);

// サーバー設定
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const options: cors.CorsOptions = {
  origin: config.server.cors.origin,
  optionsSuccessStatus: 200,
};
app.use(cors(options));

// ルーティング
app.use("/api/v1", booksRouter(express));

// エラーハンドリング
errorHandling(app);

module.exports = server;
