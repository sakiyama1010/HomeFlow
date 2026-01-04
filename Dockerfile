# ベースイメージを指定
FROM node:22-alpine

# ポート3000を公開
EXPOSE 3000

# bash をインストール
RUN apk add --no-cache bash

# ls のエイリアスを登録する
RUN echo "export LS_OPTIONS='--color=auto'" >> ~/.bashrc \
  && echo 'alias ls="ls $LS_OPTIONS"' >> ~/.bashrc \
  && echo 'alias ll="ls $LS_OPTIONS -l"' >> ~/.bashrc \
  && echo 'alias l="ls $LS_OPTIONS -lA"' >> ~/.bashrc