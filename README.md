# ぴーくんアルバム (P-kun Album)

家族で子どもの写真をそっと共有するための、やさしいフォトアルバム Web アプリ。

- ✅ 写真をたくさんアップロードできる
- ✅ 新しい順に時系列で眺められる
- ✅ 単一の巨大アルバム — フォルダ分け不要
- ❌ コメント・いいね機能なし — しずかに、家族だけで

対象は **小さなお子さんがいるご家族** と、その写真を見守る **おじいちゃん・おばあちゃん**。
言語は **日本語**、トーンは **やわらかく・あたたかく・ていねい**。

---

## Claude Design からのハンドオフ

このリポジトリは [Claude Design](https://claude.ai/design) で作成されたプロトタイプを、コーディングエージェント (Claude Code) が実プロダクトとして実装したものです。

ハンドオフバンドル（チャット履歴・デザイン仕様・HTML/CSS/JSX プロトタイプ・アセット一式）は `p-kun-album-design-system/` 以下にそのまま保管しています。デザインの意図や、ユーザーとの対話の中で決まった仕様変更（フォルダ階層の撤廃、単一アルバム化、無限スクロール採用など）は `p-kun-album-design-system/chats/` のチャットログから辿れます。

| 場所 | 内容 |
|---|---|
| `p-kun-album-design-system/README.md` | ハンドオフバンドルの読み方 |
| `p-kun-album-design-system/chats/` | デザイン中のユーザーとのやり取り |
| `p-kun-album-design-system/project/README.md` | ブランド・コンテンツ・ビジュアルの規約 |
| `p-kun-album-design-system/project/colors_and_type.css` | デザイントークンの正本 |
| `p-kun-album-design-system/project/ui_kits/web/` | 元の HTML/JSX プロトタイプ |

---

## 技術スタック

- **React 18** — UI ライブラリ
- **Vite 5** — 開発サーバー＆ビルドツール
- **Phosphor Icons (Duotone)** — アイコン (CDN)
- **Google Fonts** — Zen Maru Gothic / M PLUS Rounded 1c / Kosugi Maru

依存は最小限にとどめています。CSS フレームワークやコンポーネントライブラリは使わず、デザイントークン (CSS カスタムプロパティ) と inline style で組み立てています。

---

## React 設計方針

### 1. プロトタイプ忠実主義 — ただし JSX 構造はリファクタ

Claude Design が出力する JSX プロトタイプ (`p-kun-album-design-system/project/ui_kits/web/`) は Babel Standalone 上で動く UMD スタイルでした。これを実プロダクト用に以下のとおり再構成しています：

- `window` グローバルへの export を **ESM の `import` / `export`** に置き換え
- `useStateApp` `useStateLogin` のような重複回避用エイリアスを通常の `useState` にリネーム
- `script src="..."` での順次読み込みを Vite のモジュールグラフに統合

**ビジュアルは pixel-perfect に踏襲**（色・余白・角丸・影・モーション）し、内部構造のみ整えました。

### 2. デザイントークンを正本にする

色・余白・角丸・影・モーションは `src/styles/colors_and_type.css` の CSS カスタムプロパティで一元管理しています (`--brand` `--bg` `--fg` `--shadow-md` 等)。

> **当面の実装ノート**: 一部のコンポーネントでは可読性とプロトタイプ移植の容易さを優先し、トークン値を直接 16 進数で書いている箇所があります。今後リファクタの際は `var(--brand)` 形式に揃えていく方針です。

### 3. ステートはローカル最小、prop drilling のみ

家族向けの小さなアプリで、画面遷移もログイン → ホームの 2 階層しかないため、グローバルステート管理ライブラリ（Redux, Zustand, Context 等）は導入していません。
`App.jsx` がトップレベルで `authed` `uploadOpen` `history` `lightbox` `toast` を持ち、子コンポーネントには props で渡しています。スケールが必要になったら見直します。

### 4. パフォーマンス — 巨大アルバム対策

ユーザー要望「写真は 8000 枚以上入る、ファーストビューを軽くしたい」に対して：

- **無限スクロール**: `IntersectionObserver` で 60 枚ずつ追加ロード
- **新しい順固定**: 古い写真は最初は描画しない
- **`useMemo`**: 日付グループ見出しの計算をキャッシュ
- 仮想化ライブラリ (react-window 等) は導入していません — 現状 IntersectionObserver で十分軽快なため、必要になったら検討します

### 5. ファイル構成

```
src/
  main.jsx                 — エントリ
  App.jsx                  — トップレベル状態機械
  components/
    Primitives.jsx         — Mascot / Logo / Avatar / Button / Badge
    Header.jsx             — スティッキーヘッダー
    LoginScreen.jsx        — ログイン画面
    AlbumGrid.jsx          — 単一アルバム + 無限スクロール
    HistoryFeed.jsx        — 更新履歴サイドバー
    UploadModal.jsx        — アップロードモーダル (idle/uploading/done)
    FAB.jsx                — 右下のアップロードボタン
  styles/
    colors_and_type.css    — デザイントークン (正本)
    global.css             — リセット + キーフレーム
public/
  assets/                  — マスコット / ロゴ / 装飾の SVG
```

### 6. 実装上の決まり

- **絵文字は基本的に使わない** — マスコット (P-kun) で温かみを出す
- **角は丸く** — ボタンは 999px、カードは 20px、モーダルは 28〜36px
- **影はあたたかい色味** — `rgba(70, 60, 30, …)` ベース、決してニュートラルグレーにしない
- **グラデーションは UI には使わない** — 写真サムネのプレースホルダにのみ使用
- **ホバー: `translateY(-2px)` + 影を強める / プレス: `scale(0.97)`**

---

## 開発

パッケージマネージャは **pnpm** を使用します（`packageManager` フィールドで pin 済み）。Corepack 経由で自動的に正しいバージョンが使われます。

```bash
pnpm install   # 依存をインストール
pnpm dev       # http://localhost:5173/ で開発サーバー起動
pnpm build     # dist/ に本番ビルド
pnpm preview   # ビルド成果物をプレビュー
```
