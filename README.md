# マンション管理組合アプリ

マンション管理組合の理事長と会計の役職が、将来いつ自分に回ってくるかを計算するWebアプリケーションです。

## 機能

- 自分の部屋番号と現在の年齢を入力
- 理事長になる年と、その時の年齢を計算
- 会計になる年と、その時の年齢を計算

## 開発

### 必要な環境

- Node.js 18以上

### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ブラウザでhttp://localhost:5173にアクセス
```

### ビルド

```bash
# 本番ビルド
npm run build

# ビルド後のプレビュー
npm run preview
```

## デプロイ

### Vercel

```bash
npx vercel
```

### Netlify

```bash
npx netlify deploy --prod
```

## 技術スタック

- SvelteKit (Svelte 5)
- TypeScript
- Tailwind CSS
