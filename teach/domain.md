# 自定义域名绑定教程
### 导言
我们知道github或者cloudflare国际服务的免费二级域名网站（合法网站但敏感）可能会偶尔出现访问不稳定，容易被针对性封锁。<br>
如果你在github pages绑定了你的自定义域名，这确实能做到提速，但仅仅这么做，想要封锁你自己的域名还是非常简单。<br>
我们推荐做多域名绑定同一个github的pages架构<br><br>
如下：<br><br>
<strong>用户 → 2~3个备用域名 → Cloudflare CNAME → 主域名 → GitHub Pages</strong><br><br>
在这之前，你仍旧需要先绑定主域名（自定义）到github的pages
## 免费绑定教程
