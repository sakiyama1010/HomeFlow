#!/bin/bash
set -e
set -o pipefail

# スクリプトが置かれているディレクトリ
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# bin ディレクトリを計算
BIN_DIR="$SCRIPT_DIR/"
pushd "$BIN_DIR" > /dev/null

# 共通envの読み込み
COMMON_ENV="./sonarqube/.env"
if [ -f "$COMMON_ENV" ]; then
    while IFS='=' read -r key value || [ -n "$key" ]; do
        [[ "$key" =~ ^# ]] && continue
        [[ -z "$key" ]] && continue
        export "$key=$value"
    done < "$COMMON_ENV"
else
    echo ".envが見つかりません: $COMMON_ENV"
    exit 1
fi

# 引数チェック
if [ $# -eq 0 ]; then
    echo "エラー: 解析するプロジェクトが設定されていません。"
    echo "使い方: $0 <プロジェクト名> [<別プロジェクト名> ...]"
    exit 1
fi

# プロジェクトごとの処理
for PROJECT_DIR in "$@"; do
    PROJECT_ENV="./sonarqube/projects/$PROJECT_DIR/.env"

    if [ ! -f "$PROJECT_ENV" ]; then
        echo "指定されたファイルが見つかりません: $PROJECT_ENV"
        continue
    fi

    echo "=== プロジェクト解析開始: $PROJECT_DIR ==="

    # プロジェクト env 読み込み
    while IFS='=' read -r key value || [ -n "$key" ]; do
        [[ "$key" =~ ^# ]] && continue
        [[ -z "$key" ]] && continue
        export "$key=$value"
    done < "$PROJECT_ENV"

    # プロジェクトディレクトリに移動して解析
    pushd "$PROJECT_HOME" > /dev/null || { echo "ディレクトリに移動できません: $PROJECT_HOME"; continue; }

    # 解析コマンド作成（配列で安全）
    CMD=(
        "$SONAR_SCANNER_BIN"
        -Dsonar.projectKey="$SONAR_PROJECT_KEY"
        -Dsonar.sources="$SONAR_SRC"
        -Dsonar.host.url="$SONAR_HOST_URL"
        -Dsonar.login="$SONAR_TOKEN"
        -Dsonar.nodejs.executable="$(which node)"
    )

    [ -n "$SONAR_TESTS" ] && CMD+=(-Dsonar.tests="$SONAR_TESTS")
    [ -n "$SONAR_EXCLUSIONS" ] && CMD+=(-Dsonar.exclusions="$SONAR_EXCLUSIONS")
    [ -n "$SONAR_JS_COVERAGE" ] && CMD+=(-Dsonar.javascript.lcov.reportPaths="$SONAR_JS_COVERAGE")
    [ -n "$SONAR_TP_CONFIG" ] && CMD+=(-Dsonar.typescript.tsconfigPaths="$SONAR_TP_CONFIG")

    echo "実行コマンド: ${CMD[*]}"
    "${CMD[@]}"

    popd > /dev/null

    echo "プロジェクト解析完了: $SONAR_PROJECT_KEY"
done