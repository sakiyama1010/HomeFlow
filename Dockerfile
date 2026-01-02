# ベースイメージを指定
FROM node:22-alpine

# ポート3000を公開
EXPOSE 3000

# bash をインストール
RUN apk add --no-cache bash