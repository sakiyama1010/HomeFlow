# React

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

## 用語

* JSX（JavaScript XML）
  * JavaScriptにHTMLのような構文を直接記述できるようにする構文拡張
* コンポーネント
  * 独自のロジックと外見を持つ UI（ユーザインターフェース）の部品のこと
  * React におけるコンポーネントとは、マークアップを返す JavaScript 関数
  * React のコンポーネント名は常に大文字で始める必要がある
    * コンポーネント出ない場合は小文字のファイル名
* フック (Hook) 
  * use で始まる関数
* プロミス(Promise)
  * 将来終わる処理の約束(pending,fulfilled,rejected)
    * 待つ(終わるまで次の行に進まない) → await + try/catch
    * 待たない(結果を待たずに次へ進む) → .catch() or void
      * 結果に興味がない / 裏でやってほしい とき

### .ts と .tsx の違い

* .ts	TypeScript（ロジックのみ）
* .tsx	TypeScript + JSX

### import

* <https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import>

```tsx
// reactというモジュールからReactを持ってくる」
import React from 'react';
// reactというモジュールからuseState,useEffectを持ってくる」
import { useEffect, useState } from "react";
```

### Hook

* useState
  * この値が変わったら、React が画面を作り直す

```tsx
// const [値, 値を変える関数] = useState(初期値);
const [count, setCount] = useState(0);
```

* useEffect
  * コンポーネントの表示後・状態変更後に、副作用の処理を行うための仕組み

```tsx
// 初回表示時に1回だけ実行
useEffect(() => {
  console.log("初回だけ");
}, []);
// idが変わったら実行
useEffect(() => {
  console.log("id が変わった");
}, [id]);
```

## 参考

<https://www.tohoho-web.com/ex/react.html>