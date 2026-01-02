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

# alias設定
alias homeup='docker compose -f ./docker-compose.yml -p home-flow up -d'
alias homebash='docker exec -it home-flow-container bash'
alias homelog='docker logs home-flow-container'
```

## 素材

### アイコン

<https://icooon-mono.com/14371-%e3%83%90%e3%82%b1%e3%83%84%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b32/>