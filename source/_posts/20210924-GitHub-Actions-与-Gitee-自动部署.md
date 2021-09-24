---
title: GitHub Actions 与 Gitee 自动部署
date: 2021-09-24 10:32:44
categories:
- 技术
- 杂谈
tags:
- 杂谈
---

## 简介

GitHub 的自动化流水线，主要功能为

- 监听推送分支
- 自动构建并部署支 GitHub Pages
- 自动推送至 Gitee
- 将构建完成的内容也推送至 Gitee Pages



<!--more-->



## ./.github/workflow/pages.yml

只要创建了这个文件再去项目顶部标签的 Actions 配置即可

简单加点备注，留存个笔记

```yaml
# 执行的 Action 名称
name: Pages

# 设定监听的分支
on:
  push:
    branches:
      - master  # default branch

jobs:
  # 任务名
  # 运行环境
  # 第一部分基本可以照搬
  # 需要修改的只有 build 指令和插件安装指令
  pages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'
      - name: Cache NPM dependencies
        uses: actions/cache@v2
        with:
          path: node_modules
          key: ${{ runner.OS }}-npm-cache
          restore-keys: |
            ${{ runner.OS }}-npm-cache
            
      # 上面是配置环境 下面开始正常 npm 流程
      - name: Install Dependencies
        run: npm install
        
	  # 不 ls 也可以 此处为了方便调试
      - name: Show ls	
        run: ls
        
      # 可选
      # 把在 plugin 目录下的插件拷贝到 node_modules 中，否则会构建失败
      - name: Install plugin
        run: cp -rf plugins/hexo-filter-sequence/* node_modules/hexo-filter-sequence/
      
      # Build & Push
      - name: Build
        run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: source  # deploying branch

  # 任务名
  sync:
    # 前置步骤和环境
    needs: pages
    runs-on: ubuntu-latest
    steps:
      # 直接调别人的轮子
      # 功能是把这个 Github 仓库和 Gitee 仓库同步
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY
          # 配置就不多说了，解释一下原因
          # 因为这步骤功能是从 GitHub 推更新到 Gitee
          # 所以需要 Gitee 持有私钥，Github 持有公钥
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        with:
          # 注意替换为你的 GitHub 源仓库地址
          source-repo: "git@github.com:zhyib/zhyib.github.io.git"
          # 注意替换为你的 Gitee 目标仓库地址
          destination-repo: "git@gitee.com:zhyib/zhyib.git"
  
  # 任务名
  gitee-pages:
 	# 前置步骤和环境
    needs: sync
    runs-on: ubuntu-latest
    steps:
      # 直接调别人的轮子
      # 功能是 Build Gitee Pages
      # 使用用户名密码登录 Gitee
      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@master
        with:
          # 注意替换为你的 Gitee 用户名
          gitee-username: zhyib
          # 注意在 Settings->Secrets 配置 GITEE_PASSWORD
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          # 注意替换为你的 Gitee 仓库
          gitee-repo: zhyib/zhyib
```



## 说明

### 公私钥

1. 在本机上生成 ssh 密钥 `ssh-keygen`
2. 给 Github项目设置配置私钥 `id_rsa` 因为是ssh链接发起方
3. 在 Gitee 的个人设置页面「[安全设置 -> SSH 公钥](https://gitee.com/profile/sshkeys)」 配置 SSH 公钥，因为是链接的接收方

### GitHub 

最终有两个配置

- Gitee 密码
- ssh 私钥



> 欢迎来我的博客
> [zhyib.gitee.io](https://zhyib.gitee.io)
> [zhyib.github.io](https://zhyib.github.io)
