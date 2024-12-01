#!/usr/bin/env sh

# 确保脚本抛出遇到的错误

set -e

# 生成静态文件

npm run docs:build

# 进入生成的文件夹

cd docs/.vuepress/dist

git init

git add -A

git commit -m 'deploy 1.1.11'

# 如果发布到 https://<USERNAME>.github.io/<REPO>

git push -f https://github.com/Pai3141/pai.git master:gh-pages

cd -

# 利用git bash的终端执行"sh deploy.sh"命令