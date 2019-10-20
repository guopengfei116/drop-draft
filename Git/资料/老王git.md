# 流行框架第2天

## git使用ssh方式上传代码与github
  - git生成公钥和私钥
    + 命令:`ssh-keygen -t rsa`生成的公钥与私钥文件会在当用户目录的.ssh目录下.


### 把代码push到服务器时需要先pull一下
  - 在pull之后如果远程的代码与本地的代码有冲突，git会先自动合并冲突，如果不能自动合并，就必需我们手动去处理冲突。

### 从服务器上pull代码到本地
  - 如果本地没有.git目录，需要先初始化一下。
  - 命令:`git pull [远程服务器地址] [远程的分支]`

### gh-pages分支-搭建博客.
  - 需要把自已博客的网页代码上传到github上的gh-pages分支
  - 然后就直接访问了
    + 访问的url形式: [github用户名].github.io/[仓库的名字]/[具体的页面]


### sourceTree , tortoiseGit


