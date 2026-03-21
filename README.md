# 学生依法维权互助
### 《中华人民共和国宪法》
第33条：<br>
**国家尊重和保障人权** <br>
第41条：<br>
**公民有权:** <br>
- 对国家机关和工作人员提出批评、建议
- 进行申诉、控告、检举
- 因违法失职行为受到损害的，有权取得赔偿
### 《中华人民共和国未成年人保护法》
- 第20条：学校不得加重学习负担
- 第21条：保障休息、娱乐、体育时间
## 项目备注<br>
因为内容敏感，本站容易被DNS污染（被防火墙针对）<br>
我们欢迎大家创建不同的镜像站点，薪火相传<br><br>
## 无限剑制😡👊创建镜像站
![愈挫愈勇](https://raw.githubusercontent.com/hepsa2/eduleader/main/fl.jpg)
镜像站相当于本站的备份，把本站架构、内容复制，可以通过另一个网址链接访问。<br>
### 如何部署本站镜像？
#### 手机即可部署！
🏹第一步，咏唱无限剑制<br>
I am the bone of my sword.<br>
吾为剑所成之身<br>
Steel is my body, and fire is my blood.<br>
钢铁为身 而火焰为血<br>
![永不言弃！](https://raw.githubusercontent.com/hepsa2/eduleader/main/fsp.jpg)
I have created over a thousand blades.<br>
手制之剑已达千余<br>
Unknown to Death.<br>
不为死所知<br>
Nor known to Life.<br>
亦不为生所知<br>
Have withstood pain to create many weapons.<br>
曾承受痛苦创造诸多武器<br>
Yet, those hands will never hold anything.<然而，留下的只有虚无<br>
So as I pray, Unlimited Blade Works.<br>
故如我祈求，无限之剑制<br><br>
🏹第二步：准备好下列资源<br>
0. 科学上网（除提速外不做其他用途）
1. 谷歌浏览器（Edge也可以，不要百度这种）
2. 匿名邮箱用来注册github和cloudflare甚至claude（不错的国外AI）,推荐使用cock.li<br>
3. 注意cock.li邮箱注册完，出于安全限制，你会被暂时禁止发送邮件。点击蓝字链接（解锁账户），然后下滑，点击解锁即可。
4. 注册github、claudflare、hcaptcha（用于人机验证投稿，防止恶意刷屏）、claude（可选），注意github账户名要用简短的英文。然后账号名和密码不要用国内社交平台的<br><br>

第三步：仓库基本设置<br>
1. 登陆你的github账号，完成2fa验证（安卓手机下载Aegis,很方便能完成验证，其他设备问AI），点击[本页面](https://github.com/hepsa2/eduleader)的叉子图标（那个叉子是圆点尖端和把柄），fork（复制）本仓库。新的仓库名你可以写简短的英文。
2. 上方more栏目，选择settings（仓库设置），找到并点击pages,然后再下拉
3. 找到 Branch，在那一段文字下面点none按钮，选择main,再点击save<br><br>

第四步：hcaptcha配置
1. 谷歌浏览器访问[hcaptcha.com](https://www.hcaptcha.com)
2. 注册账户，你会拿到secret key（ES开头的一长串）,把它复制到手机自带的记事本里
3. 添加站点（最上方栏目里选站点），域名填写：你的用户名.github.io
4. 接下来你可以自己设置人机验证的难度，推荐选择始终挑战、困难。
5. 然后点击保存，平台会生成站点密钥给你，你也和secret key保存在一起（手机本地的记事本里）


第五步：cloudflare配置<br>
1. 左上角菜单栏（三条横杠），找到compute,下拉后选workers&pages
2. 点击create application,选择start with helloworld
3. 等待一段时间，不要着急乱点按钮。
4. 你会来到cloudflare的worker设置面板。点击右上角三点，edit code,进入js编辑页面
5. 然后浏览器开另外一个窗口页，进入你的github账号（直接github.com也行）
6. 进入你的仓库（复制自eduleader的），点击cfworker.js这行字，然后再点下面一排的三个点，选copy
7. 成功copy复制代码后，粘贴到cloudflare的js编辑页面，那个框里，注意要先提前把框里原来的代码全部删掉再粘贴。
8. 粘贴完右下角蓝色按钮deploy点击保存。保存完回到设置面板，点击上面一栏的设置（向右滑动）
9. 下滑找到Variables and Secrets，点击add
10. type选择secret,Variable name填HCAPTCHA_SECRET
11. Value填你记事本里存的secret key（ES开头的）
12. 再add一个，type可以选text,name是REPO_OWNER
13. value写你的github账户名
14. 再add,type还是text,name是REPO_NAME，value写你的仓库名
15. 再add,text,name是ISSUE_LABEL，value写投稿，没错就是两个中文汉字
16.点击右下角deploy保存，回到worker面板的overview一栏，长按🌏xxxxx.xxxxxx.workers.dev，复制整个链接，先粘贴到记事本里，到时候用<br><br>

第六步：github配置
1. 登陆github来到你的仓库，点击index.html,点击下面一栏的三个点，选in place,编辑你的html代码
2. 下滑找到配置区，第876行代码，把引号里的网址删掉，粘贴你的worker地址（末尾不要带/这个符号）
3. 粘贴上你自己的站点密钥（不要写secret key！）
4. 修改仓库所有者、仓库名成你自己的。下面那个参数是最大展示的投稿篇目，你可以写99,也可以写20，随意。
5. 注意粘贴的内容要包在引号里面，不要没了引号！
6. 接下来上滑，commit changes保存修改
7. 找到并进入仓库页面上面栏目的issues（或者可以在more→settings看到）
8. 点labels,添加新的三个标签new label,名字分别是投稿、发布、拒绝，颜色可以随你选，Description可留空，然后分别保存
9. 点击右上角你的github账号
10. 点settings,找到最下面developer settings，再点personal 设置里的fine-那个设置
11. generate new token,token名字随便，下面一栏可以不写，下滑找到Repository access，选择Only select repositories，然后select下拉选择你的仓库
12. Permissions那个框的右上角点+
13. 勾选issues，再展开选read and write
14. generate token提交即可，之后你会看到github给你一串字符，右边有一个复制按钮，点击复制，粘贴在记事本里<br><br>

第七步：cloudflare新增环境变量
1. 进入刚刚的worker设置面板，点设置，下拉，再add一个环境变量，type是secret,name是GITHUB_TOKEN
2. value就粘贴上你记事本里的github_pat开头的一串
3. 右下角deploy<br><br>

你的镜像站网址就是：<br>
https://你的github用户名.github.io/你的仓库名<br>

不过github免费生成的站点在大陆并不稳定，你最好需要购买一个域名，之后github绑定。推荐匿名购买国外的域名。<br>
[免费获得二级域名](https://dynv6.com)

## 怎样提升网站存活时间
不要直接把网址传播给其他人，可以选择外套即使焚毁链接。什么意思呢，就是你额外生成一个定时可以自动失效的链接，别人点击链接后才能看到你的镜像站地址。这种方式能够使你的站点免受低级爬虫抓取。<br>
[点击选择private bin实例](https://privatebin.info/directory)<br>
进入实例列表页面，点击任意蓝字，你会进入新页面，点菜单栏，设置一个长密码（你不能忘记），最好勾选阅后即焚，选择链接保存时间，推荐一个星期。<br>
在框内粘贴你的镜像站地址，然后顺带也说一下如何安全分享站点提高存活度。<br>
## 设置giscus评论系统
1. github仓库启用discuss（设置里自行查找）
2. 把[giscus](https://github.com/apps/giscus)安装到你的github仓库上。
3. 访问[giscus](https://giscus.app/zh-CN)并填写：
- 仓库：账号/仓库名（注意要带斜杠）
- 页面 ↔️ discussions 映射：推荐选择 "pathname"
- Discussion 分类：推荐选择 "Announcements"
- 主题：选择适合你页面的深色主题
4. 在regulations.html里编辑代码，找到末尾部分，把：<br><br>

- data-repo
- data-repo-id
- data-category
- data-category-id
换成你的（你的id可以在giscus网页看到）
## 网站架构
浏览器<br>
   │<br>
Cloudflare Worker<br>
   │<br>
GitHub API（用于生成Issues）<br>
## 联系我们
你可以通过安全、匿名的社交平台（XMPP协议）联系我们<br>
[什么是XMPP？怎么下载？](https://shiyiyue.codeberg.page/rev1/html/xmpp%E6%95%99%E5%AD%A6.html)
备注：这个网页不是我们的，仅供参考，另外不要在XMPP暴露任何个人信息，尤其是你的微信qq号与学校、举报内容<br>
XMPP频道：<br>
students@muc.5222.de<br><br>
出于安全问题，我们暂时关闭了联络渠道，上面是我们推荐的交流群地址
