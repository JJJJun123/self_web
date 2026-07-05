# self_web — 陈俊旭个人网页

线上地址：<https://me.jjjj789.win/>

纯静态单页，无构建步骤、无外部依赖、无跟踪脚本。改完文件直接部署即可。

## 结构

```
index.html            页面内容（改简历内容就改这里）
assets/css/style.css  样式（设计变量集中在 :root）
assets/js/main.js     入场动画、滚动显现、数字滚动、导航高亮
assets/fonts/         自托管字体（STIX Two Text + IBM Plex Mono，仅 latin 子集）
assets/img/           头像与证书图片
```

## 本地预览

```bash
python3 -m http.server 8899
# 打开 http://localhost:8899
```

## 部署

服务器：Vultr VPS（45.76.111.206），nginx 站点目录 `/var/www/me`，
域名经 Cloudflare 代理（`me` 子域 A 记录 → 45.76.111.206，开启代理）。

```bash
rsync -avz --delete --exclude .git ./ root@45.76.111.206:/var/www/me/
```

HTTPS 证书由 certbot 管理，自动续期。

## 设计说明

方向：「年报印刷 × 风控终端」。宣纸底色 + 墨色文字 + 印章红点缀；
中文标题用系统宋体，拉丁字符用 STIX Two Text（科学出版衬线），数字与标签用 IBM Plex Mono。
配色、字体、间距变量都在 `style.css` 的 `:root` 里，整体换肤只动那一处。
