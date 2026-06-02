---
title: kibunlog
summary: その日の気分を短い言葉で書き残して、ふり返るための日記アプリ。Slack bot からも記録できます。
tags:
  - Web App
  - 個人運用中
techStack:
  - Nuxt 3
  - FastAPI
  - MySQL
  - Docker
liveUrl: https://kibunlog.takakusagi.dev
order: 1
publishedAt: "2025"
---

## どんなもの?

その日の気分や出来事を、短いテキストで書き残すための日記アプリです。
書きたいときにサッと開いて、書いたものを後でゆるく振り返れる、というのが目指している体験です。

## なぜ作ったか

日常のちょっとした出来事や感情の動きを、外部サービスに預けるのではなく自分の手元に残しておきたい、と思ったのがきっかけです。
既存の日記サービスはどれも合わなかったので、自分の使い心地に合うものを自分で組むことにしました。
Slack で文章を書く流れがあったため、Slack bot から記録できる導線も合わせて作っています ([claude-slack-bot](/works/slack-bot/) と連携)。

## 技術スタック

- **フロント**: Nuxt 3 (Vue 3, Composition API)
- **API**: Python + FastAPI (uvicorn)
- **データベース**: MySQL 8.4
- **リバースプロキシ**: Caddy (内部、HTTPS 終端は Cloudflare Tunnel)
- **基盤**: Docker Compose で自宅 Debian サーバーに常駐

## 構成

Cloudflare Tunnel 経由でインターネットに公開し、内部では Caddy がフロントと API を振り分けています。
データは MySQL に保存し、自宅サーバー上で完結する構成です。バックアップは別系統で取っています。

## 工夫したこと

- 書き始めるまでの摩擦を減らすために、入力欄を常に手前に置き、タップ数を最小化する設計にしました
- Slack bot からの記録は、bot 側で kibunlog の API クライアントを実装し、同じデータベースに直接記録されます
- 自宅サーバー運用なので、`docker compose up -d --build` 一発で更新が反映する形を維持しています
