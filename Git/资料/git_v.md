# git

### init
作用：让git管理此项目，一个项目调用一次
语法：git init

### config
作用：配置用户名与邮箱，在提交版本时就会有对应的记录
语法：git config --blobal user.name xxx
语法：git config --blobal user.email xxx
语法：git config --blobal alias.{别名} {命令} ==> 给指定命令起别名
语法：git config --list ==> 查看所有配置

### add
作用：提交工作区文件到暂存区
语法：git add {文件名1 文件名2} ==> 提交指定工作区文件
语法：git add -A ==> 提交全部工作区文件

### rm
作用：删除文件
语法: git rm {fileName} ==> 删除工作区文件
语法：git rm -f {fileName} ==> 删除工作区和暂存区文件
语法: git rm --cached {fileName} ==> 删除暂存区文件，保留工作区文件

### commit
作用：提交新版本
语法：git commit -m {描述} ==> 产生一个新版本提交
语法：git commit -m {描述} --amend ==> 不产生新版本，合并到上一次提交的版本

### diff
作用：不同区之间的代码差异对比
语法：git diff [fileName] ==> 工作区与暂存区之间的对比
语法：git diff --cached(--staged) [fileName] ==> 暂存区与版本区之间的对比
语法：git diff master [fileName] ==> 工作区与版本区之间的对比
语法：git diff [分支名] [分支名] [fileName]

### reset
作用：恢复工作区文件
语法：git reset HEAD {fileName}  ==> 把暂存区撤回某文件到工作区
语法：git reset --hard HEAD^ ==> 恢复到上一次提交的版本
语法：git reset --hard HEAD~{number} ==> 恢复到之前第几次提交的版本
语法：git reset --hard {commitId} ==> 恢复工作区文件到指定版本

### checkout
> 检出命令，该命令会重写工作区。

* 语法一：git checkout
    - 对工作区进行状态检查，显示工作区、暂存区与HEAD的差异
* 语法二：git checkout [-q] [<commit>] [[--] <paths> ...]
    - 该语法不会改变HEAD指针，主要用于指定版本的文件覆盖工作区文件
    - commit如果省略则暂存区文件覆盖工作区文件；否则版本区覆盖工作区与暂存区文件
    - 未避免路径与引用同名发生冲突，可以在paths前用两个连续短线作为分隔
* 语法三：git checkout <branch>
    - 该语法会改变HEAD指针，用于分支切换，跟踪分支。
* 语法四：git checkout [-m] [[-b] [--orphan]] [new_branch] [<start_point>] 
    - 创建和切换到新的分支，新分支可以从指定提交开始创建
    - --oaphan创建的分支是不记录任何历史版本的分支

语法：git checkout {file.name} ==> 检出当前分支文件
语法：git checkout {分支名} 检出指定分支文件
语法：git checkout {commitId} {file.name} 从指定版本区恢复某个文件
语法：git checkout -b {分支名} 在当前基础上创建分支并切换到该分支

### branch
作用：分支操作
语法：git branch ==> 查看所有分支
语法：git branch {分支名} ==> 创建分支
语法：git branch -d {分支名} ==> 删除指定分支
语法：git branch -D {分支名} ==> 强制删除未被合并的分支
语法：git branch --merged ==> 查看已merge到当前分支的分支
语法：git branch --no-merged ==> 查看未merge到当前分支的分支

### log
作用：查看提交新版本的历史
语法：git log [--oneline] [-数量]
语法：git log [-要查看的数量]

### reflog
作用：查看所有版本切换的历史记录
语法：git reflog

### remote
作用：查看远程仓库信息
语法：git remote 查看远程仓库名字
语法：git remote -v 查看远程仓库的地址
语法：git remote show 仓库名字

### push
作用：提交本地版本区到远程仓库，远程没有该分支则会创建
语法：git push {远程仓库名} {分支名}

### pull
作用：拉取远程仓库代码合并到当前工作区
语法：git pull

### fetch
作用：拉取远程仓库git信息到本地
语法：git fetch

### merge
作用：合并某分支到当前分支
语法：git merge {仓库名/分支名}
语法：git merge {版本ID}

### stash
作用：暂存区文件缓存操作
语法：git stash ==> 临时存储暂存区文件
语法：git statsh apply ==> 取出临时存储的暂存区文件
语法：git statsh drop ==> 删除暂存区缓存
语法：git statsh pop ==> 取出临时存储的暂存区文件，并删除缓存

### tag
作用：标签操作
语法：git tag ===> 查看所有标签
语法：git tag {标签名} ==> 创建标签

i5ting_toc -f sample.md -o
