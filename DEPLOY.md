# デプロイガイド

このマンション管理組合アプリは、SvelteKitで構築されているため、以下のプラットフォームにデプロイ可能です。

## 推奨デプロイ先

### 1. Vercel（最も簡単・推奨）

#### 特徴
- SvelteKitの開発元が提供
- 自動デプロイ、カスタムドメイン対応
- 無料プランあり

#### デプロイ手順

**方法A: CLIからデプロイ**

```bash
# Vercel CLIをインストール（初回のみ）
npm install -g vercel

# デプロイ
npx vercel

# 本番環境にデプロイ
npx vercel --prod
```

**方法B: GitHubと連携**

1. プロジェクトをGitHubにプッシュ
2. [Vercel](https://vercel.com)にアクセス
3. 「New Project」をクリック
4. GitHubリポジトリを選択
5. 「Deploy」をクリック

設定は自動的に検出されます。

---

### 2. Netlify

#### 特徴
- シンプルなデプロイ
- 継続的デプロイメント
- 無料プランあり

#### デプロイ手順

**方法A: CLIからデプロイ**

```bash
# Netlify CLIをインストール（初回のみ）
npm install -g netlify-cli

# ビルド
npm run build

# デプロイ
npx netlify deploy --prod
```

**方法B: GitHubと連携**

1. プロジェクトをGitHubにプッシュ
2. [Netlify](https://netlify.com)にアクセス
3. 「Add new site」→「Import an existing project」
4. GitHubリポジトリを選択
5. ビルド設定を確認（自動検出されます）
   - Build command: `npm run build`
   - Publish directory: `.svelte-kit/output/client`
6. 「Deploy site」をクリック

**必要に応じてadapterを変更:**

```bash
npm install -D @sveltejs/adapter-netlify
```

`svelte.config.js`を編集:
```javascript
import adapter from '@sveltejs/adapter-netlify';
```

---

### 3. Cloudflare Pages

#### 特徴
- 高速なエッジネットワーク
- 無料プランが充実
- グローバル配信

#### デプロイ手順

1. プロジェクトをGitHubにプッシュ
2. [Cloudflare Pages](https://pages.cloudflare.com)にアクセス
3. 「Create a project」をクリック
4. GitHubリポジトリを選択
5. ビルド設定:
   - Build command: `npm run build`
   - Build output directory: `.svelte-kit/cloudflare`
6. 「Save and Deploy」をクリック

**adapter変更が必要:**

```bash
npm install -D @sveltejs/adapter-cloudflare
```

`svelte.config.js`を編集:
```javascript
import adapter from '@sveltejs/adapter-cloudflare';
```

---

### 4. GitHub Pages（静的サイト）

#### 特徴
- GitHubリポジトリから直接配信
- 完全無料
- 静的サイトとして配信

#### デプロイ手順

**adapter変更:**

```bash
npm install -D @sveltejs/adapter-static
```

`svelte.config.js`を編集:
```javascript
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
};
```

**デプロイ:**

```bash
# ビルド
npm run build

# gh-pagesブランチにデプロイ
npx gh-pages -d build
```

---

## デプロイ前のチェックリスト

- [ ] `npm run build` でビルドが成功することを確認
- [ ] `npm run check` で型チェックが通ることを確認
- [ ] ローカルで `npm run preview` してビルド版が正常に動作することを確認
- [ ] 環境変数が必要な場合は、デプロイ先で設定

## トラブルシューティング

### ビルドエラーが出る

```bash
# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install
npm run build
```

### アダプターエラーが出る

デプロイ先に応じて適切なアダプターをインストールしてください:

```bash
# Vercel
npm install -D @sveltejs/adapter-vercel

# Netlify
npm install -D @sveltejs/adapter-netlify

# Cloudflare
npm install -D @sveltejs/adapter-cloudflare

# 静的サイト
npm install -D @sveltejs/adapter-static
```

## 推奨デプロイフロー

1. **開発**: `npm run dev` でローカル開発
2. **確認**: `npm run build && npm run preview` でビルド確認
3. **デプロイ**: Vercelまたは Netlifyに自動デプロイ

最も簡単な方法は **Vercel** です。GitHubと連携すれば、プッシュするだけで自動的にデプロイされます。
