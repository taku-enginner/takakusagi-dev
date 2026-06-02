---
title: claude-slack-bot
summary: Slack 上で Claude と会話しながら、kibunlog への記録などの個人タスクを進められる自作 bot。日常運用しています。
tags:
  - Slack Bot
  - 個人運用中
techStack:
  - Python 3.12
  - Anthropic SDK
  - Slack Bolt
  - systemd
thumbnail: /images/works/form.webp
order: 2
publishedAt: "2025"
---

## どんなもの?

Slack 上で Claude と対話しながら、自分の日常タスクを進めるための bot です。
日々の記録 (kibunlog 連携)、ちょっとした調べもの、長めの相談まで、Slack のチャンネルから自然に依頼できるようにしています。

## 動作の様子

Slack のチャンネルでメンションして話しかけると、状況に応じてフォーム入力や自由文での会話ができます。

<div class="not-prose grid gap-4 sm:grid-cols-2 my-6">
  <figure class="rounded-xl bg-[color:var(--color-accent-soft)]/40 border border-[color:var(--color-border)] p-3 flex items-center justify-center">
    <img src="/images/works/input.webp" alt="bot とのやり取りの様子" loading="lazy" class="rounded-md max-h-72 w-auto" />
  </figure>
  <figure class="rounded-xl bg-[color:var(--color-accent-soft)]/40 border border-[color:var(--color-border)] p-3 flex items-center justify-center">
    <img src="/images/works/form.webp" alt="Slack 上のフォーム入力 UI" loading="lazy" class="rounded-md max-h-72 w-auto" />
  </figure>
</div>

## なぜ作ったか

普段の作業の起点が Slack に集中していたので、AI とのやり取りも同じ場所でできた方がスムーズだと考えたのが始まりです。
既製のサービスを使うのではなく自作したのは、自分専用に挙動を調整したかったから (応答スタイル、利用できるツール、保存先のデータベースなど) です。

## 構成

```
Slack
  ↓ (Events API / Bolt)
bot.py  ── conversation_store (会話履歴)
  ↓
Anthropic API (Claude)
  ↓
kibunlog API ← kibunrogu_client.py 経由で記録/参照
```

- 自宅 Debian サーバー上で **systemd ユーザーサービス** として常駐
- チャンネル単位で挙動を切り替える `channel_config.json`
- 機能を `features/` 配下に分割し、追加しやすい構造

## 工夫したこと

- 会話履歴を JSON で永続化する `conversation_store` を自前で書き、文脈を引き継いだまま再起動できるようにしました
- kibunlog API を呼び出す薄いクライアントを用意し、Slack 上のメッセージから直接 kibunlog に記録できるようにしています
- systemd の `WatchdogSec` を使ったプロセス監視で、落ちても自動復帰します

## ソースコードについて

リポジトリには個人的なコンテキストや設定が混在しているため、現時点では非公開で運用しています。
動作の様子や構成について気になる点があれば、お気軽にお問い合わせください。
