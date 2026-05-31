# Tampermonkey Scripts

个人收集和编写的油猴（Tampermonkey）脚本合集，用于提升日常浏览和各类 Web 平台的操作效率。

## 脚本列表

### 自动化操作

| 脚本 | 说明 | 目标站点 |
|------|------|----------|
| `auto click.user.js` | 自动点击页面元素 | 知乎、豆瓣、圣经阅读、加密货币水龙头等 |
| `auto copy.user.js` | 自动复制指定元素的值 | 百宝云 (baibaoyun) |
| `auto filter.user.js` | 页面内容过滤与简化 | TAPD、云途 OMS |
| `auto fix.user.js` | 页面修复与操作加速 | 电影天堂 (dy2018)、喜马拉雅 |
| `auto jump.user.js` | 跳过中间页直接到达目标 | CSDN 外链、知乎外链、腾讯文档外链、YouTube、ChatGPT |
| `auto login.user.js` | 自动填写并登录 | 网易企业邮箱、GitLab、CMCM 等 |

### 飞书邮箱管理

| 脚本 | 说明 | 目标站点 |
|------|------|----------|
| `feishu-email.user.js` | 飞书共享邮箱批量创建 | 飞书管理后台 |
| `feishu-email.user2.js` | 飞书邮箱脚本变体（外部接口版） | 飞书管理后台 |
| `feishu-email-add-user.user.js` | 批量添加成员到共享邮箱 | ���书管理后台 |
| `feishu-email-remove.user.js` | 批量移除共享邮箱成员 | 飞书管理后台 |
| `feishu-email.sh` | Shell 版飞书邮箱批量创建脚本 | 命令行 |
| `feishu-test.js` | 飞书 API 调试脚本（控制台运行） | 飞书 |

### 数据采集与分析

| 脚本 | 说明 | 目标站点 |
|------|------|----------|
| `bet365.user.js` | Bet365 赛果数据采集 | bet365 |
| `bet365 api detail.user.js` | Bet365 API 详情抓取 | bet365 |
| `titan007.user.js` | Titan007 足球数据采集 | titan007 |
| `casino-spider.user.js` | Casino 数据爬取 | - |
| `RichestAddresses.user.js` | 加密货币富豪地址导出为 TXT | bitinfocharts |

### 工具类

| 脚本 | 说明 | 目标站点 |
|------|------|----------|
| `txt-downloader.user.js` | 网页小说内容自动导出为 TXT | 百度小说、掌阅、爱奇艺文学、笔趣阁等 |
| `shopify.user.js` | Shopify 后台操作增强 | Shopify Admin |
| `hk-cr.user.js` | 香港公司注册处 - 阻止自动登出 | e-services.cr.gov.hk |
| `facebook.user.js` | Facebook 操作增强 | facebook.com |
| `tradingview.js` | TradingView 图表增强 | tradingview.com |
| `focus-image.js` | 专注查看页面所有图片 | 图片站、YouTube Studio |
| `cmcm.js` | CMCM CheetahGo 广告平台增强 | advertiser.cheetahgo.cmcm.com |

### UI 优化

| 脚本 | 说明 | 目标站点 |
|------|------|----------|
| `Spec Export - Sketch Measure.user.js` | 优化 Sketch Measure 标注页的显示分辨率和尺寸 | 本地 Sketch 导出页 |

### 辅助服务

| 文件 | 说明 |
|------|------|
| `receive-tampermonkey.js` | Node.js 本地服务器，接收油猴脚本发来的命令执行请求 |
| `go hook.user.js` | Replicate sticker-maker 页面注入本地调试脚本 |

## 开发

### 环境要求

- Node.js（用于 receive-tampermonkey.js 等辅助服务）
- Tampermonkey 浏览器扩展

### 测试

```bash
npm test    # 运行 Jest 测试
npm run lint # ESLint 检查
```

### Docker

项目包含 Dockerfile，可通过 Docker 容器化运行相关服务。

## 说明

- 所有脚本均为个人使用目的编写
- `@author: Lennon`
- 脚本按需加载，通过 `@match` 指令仅在匹配的站点上运行
