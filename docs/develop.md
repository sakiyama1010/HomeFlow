# 開発

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
# カバレッジ取得
npm test -- --coverage

# alias設定
alias homeup='docker compose -f ./docker-compose.yml -p home-flow up -d'
alias homebash='docker exec -it home-flow-container bash'
alias homelog='docker logs home-flow-container'

# sonar
# WSL
docker compose -f docker-compose.sonar.yml -p home-flow-sonar up -d
apt install unzip
sh sonar-setup.sh
# SonarQube コンテナは 非rootユーザー（UID 1000） で動くので権限調整が必要
sudo chown -R 1000:1000 ./sonarqube
sudo chmod -R 775 ./sonarqube
# browser
http://localhost:19000/
## 最初はadmin/admin
## adminadminにパスを変更(ローカルなので雑記載)
## Project display name:HomeFlow
## Project key:home-flow
## Main branch name:main
## Analysis Method:Locally
## Token name:home-flow-sonar-token
## Expires in:No Expire(ローカルなので雑記載)
## What option best describes your build?:other
## What is your OS?:Linux
# WSL
## nodejs22にする
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm --version
## 0.39.7
## sonar対応版が18
nvm install 18
# デフォルト設定
nvm alias default 18
nvm use 18
node -v
# テスト実施
bash ./run-sonar.sh home-flow
```