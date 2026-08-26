---
title: "GitHub for DevRev スナップイン接続を検証してみた"
excerpt: "OAuth接続とGitHub App接続の違いを実際に試し、Org配下リポジトリでイベントが届く条件を確認した"
publishedAt: 2026-08-22
tags: ["GitHub連携", "スナップイン", "検証"]
---

## 検証の目的

GitHub連携でPRとIssueを紐づけたい。接続方式によってイベントが届くかが変わるという話を、実際に試して確認する

## 手順

1. OAuth接続でリポジトリを紐づけ
2. ブランチ作成・PR作成
3. DevRev側でコード変更イベントの有無を確認
4. GitHub App（スナップイン）接続に切り替えて再検証

## 結果

OAuth接続ではOrg配下リポジトリのイベントが届かなかった。GitHub App経由の接続に変更後、ブランチ・PR・コミットのイベントがDevRevに届くことを確認

## 学び

「繋いだつもり」でも接続方式を確認する。特にOrganization配下のリポジトリではGitHub App接続が前提になりやすい
