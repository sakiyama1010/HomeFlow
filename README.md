# study-react

```sh
docker compose -f docker-compose.yml -p study-react up -d --build

docker exec -it study-react-container bash
# コンテナ内
cd /usr/src/app
# ビルド
npm run build
# サーバ立ち上げ
npm start
```
