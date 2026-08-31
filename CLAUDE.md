# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code (claude.ai/code) 向けのガイダンスを提供する。

## プロジェクト概要

「Mall Insight」（ECモール統合分析システム）— ECモール運営者向けの Laravel + Vue アプリケーション。販売実績・年間販売目標・システム需要予測を分離して管理し、これらを用いて SKU 別の将来在庫、欠品リスク、推奨発注数を算出する。業務ロジック（予測方式、季節係数・トレンド係数、バックテスト、在庫試算など）は `docs/`（日本語）に詳細な仕様として整理されている。機能を実装する際は、推測せずにまず該当ドキュメントを確認すること。主なドキュメント：

- `docs/documents/要件定義書.md` — 要件定義書（「なぜ」を知るならまずここ。冒頭の改訂履歴に各ルールが変更された理由が書かれている）
- `docs/documents/構成/ページ構成.md` — 画面一覧（PG-xxx の画面IDと要件の対応）
- `docs/documents/システム需要予測設計/` — 需要予測アルゴリズム設計（平均日販、季節性、トレンド、バックテスト、モデル選択）
- `docs/documents/販売実績取込要件/`、`商品在庫取込要件/` — 販売実績・在庫の取込要件（BOSS・Amazon各レポートの形式）
- `docs/documents/商品管理要件/` — 商品マスタ要件
- `docs/参考/` — 取込要件で参照されているサンプル取込データ（BOSSのCSV/XLSX出力、AmazonのAmazon全注文レポート・FBA在庫レポート）

**現在の状態：** `src/` 内の Laravel/Vue アプリはまだ手つかずのフレームワークスケルトンのまま（デフォルトの `welcome` ルート/ビュー、デフォルトの `User` モデルのみで、業務コードは未実装）。`src/AGENTS.md` と `src/CLAUDE.md` には Laravel Boost の `<laravel-boost-guidelines>` ブートストラップ用ブロックがまだ残っており、Boost は未インストールの状態を示している。そのブロックの指示に従い、本格的なアプリケーション実装に入る前に `src/` で `composer require laravel/boost --dev && php artisan boost:install` を実行し、生成された `src/AGENTS.md` を読み直すこと。`src/CLAUDE.md` / `src/AGENTS.md` は Boost のインストーラーが管理するファイルなので手動で編集しない。

## 作業ディレクトリ

実際の Laravel アプリケーションはリポジトリのルートではなく **`src/`** 配下にある。`composer`、`npm`、`artisan` の各コマンドはすべて `src/` から実行すること。リポジトリルートには他に `docs/`（要件）と `.devcontainer/`（開発環境定義）がある。

## コマンド

以下はすべて `src/` から実行する。

### PHP / Laravel
```
composer install                 # PHP依存パッケージのインストール
php artisan test                 # PHPUnitテストスイートの実行（Unit + Feature）
php artisan test --filter=Name   # メソッド名/クラス名を指定して単体テストを実行
vendor/bin/phpunit tests/Feature/ExampleTest.php   # テストファイルを直接指定して実行
php artisan dev                  # ローカル開発サーバーの起動（serve + queue + vite、composerのdevスクリプト経由）
php artisan migrate              # マイグレーション実行（.env.exampleではsqliteがデフォルト、devcontainerではMySQL）
```

### JS / Vue
```
npm install
npm run dev            # vite開発サーバー起動（5173番ポート）
npm run build           # 本番ビルド
npm run lint            # resources/js と設定ファイルに対するeslint
npm run format           # prettier --write
npm run format:check     # prettier --check
npm run typecheck        # vue-tsc --noEmit
npm run test             # vitest run
npm run check            # format:check → lint → typecheck → test の順に実行
```

フロントエンド・バックエンドを横断して一括実行するスクリプトは無い。作業完了前に JS 側は `npm run check`、PHP 側は `php artisan test` をそれぞれ個別に実行すること。

## 技術スタックと構成

- **バックエンド**: Laravel 13、PHP 8.3。`App\` 名前空間で PSR-4 オートロード（`src/app/`）。標準的な Laravel の構成（`app/Http/Controllers`、`app/Models`、`app/Providers`、`routes/web.php`、`database/migrations`）。
- **フロントエンド**: Vue 3 + TypeScript、Vite（`laravel-vite-plugin`）でビルド。`vite.config.js` はエントリポイントとして `resources/js/app.ts` を指定しているが、現状は空のスケルトンである `resources/js/app.js` しか存在しない — フロントエンド実装に着手する際は、`app.ts` を作成するか設定側を修正して不整合を解消する必要がある。状態管理は Pinia（`pinia-plugin-persistedstate` 導入済み）、ルーティングは vue-router、スタイリングは Tailwind CSS v4（`@tailwindcss/vite`）と Flowbite コンポーネント。パスエイリアス：`@` → `resources/js`、`@css` → `resources/css`。
- **データベース**: ローカルではデフォルトで sqlite（`src/.env.example`）、devcontainer では MySQL 8.0（`db` サービス、データベース名 `mall_insight`）。テストは sqlite の `:memory:` を強制使用（`src/phpunit.xml`）。
- **開発環境**: `.devcontainer/` が Docker Compose 構成を定義（AlmaLinux 9.6、PHP 8.3、Node 24）。サービスは `app`、`db`（MySQL）、`phpmyadmin`（8081番ポート）。

## コーディング規約

- フォーマットは Prettier で強制される（`.prettierrc`：4スペースインデント、ダブルクォート、printWidth 200、singleAttributePerLine 無効）。JS/TS/Vue に適用され、リポジトリ全体が対象だが `*.md` は除外される（`.prettierignore`）。PHP のフォーマットは Laravel Pint（`laravel/pint` の devDependency）を使用 — `pint.json` はコミットされていないためデフォルト設定が適用される。
- 業務要件ドキュメント（`docs/`）は日本語で書かれており、業務ロジック（計算式、警告条件、画面ID等）の一次情報源である。該当ドキュメントが存在する場合、予測・在庫計算のロジックをコードだけから推測しないこと。必ず先に `docs/documents/` を確認する。
