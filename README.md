# home-flow

* React勉強を兼ねた掃除補助アプリ
  * 補充品の在庫管理や最後に掃除した日、掃除方法を管理する

## 使い方

```sh
docker compose -f docker-compose.yml -p home-flow up -d --build

docker exec -it home-flow-container bash
# コンテナ内
cd /usr/src/app
# インストール
npm install
# ビルド
npm run build
# サーバ立ち上げ
npm start
```

## やりたいこと(雑メモ)

* GCPを使った画像管理(AWSでいうS3)
* データ管理
* 開発環境整備

## やったこと

```sh
# typescriptのインストール
npm install --save-dev typescript @types/node @types/react @types/react-dom @types/
# 初期化
npx tsc --init
# 文法チェック
npm install --save-dev eslint
# コード整形
npm install --save-dev prettier
```

## 素材

### アイコン

<https://icooon-mono.com/14371-%e3%83%90%e3%82%b1%e3%83%84%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b32/>