# smartDoorVisit
 智能门锁访客

## 项目背景及简介
smartDoorVisit 是一套面向社区、园区和企业办公场景的访客预约系统前端项目。基于 uni-app 构建，支持 H5 为主的多端发布形态，提供访客预约、二维码通行、访客记录与结果反馈等能力，结合后端门禁/物联网平台实现无接触、高效的通行体验。

## 目标客户
- 物业公司与智慧社区运营方
- 园区/园企行政与安保部门
- 写字楼/联合办公空间与前台
- 学校/医院/工地等有访客通行管控需求的单位

## 平台定位
- 作为门禁/物联网平台的访客预约前端应用
- 覆盖访前预约、访中验码、访后留痕的完整闭环
- 以轻量、可快速对接的方式，适配不同后端接口与门禁厂商

## 平台技术
- 技术栈：uni-app + Vue，样式基于 `uni.scss` 与 `common/uni.css`，二维码能力由 `common/uqrcode.js` 提供，原生能力桥接在 `common/bridge.js`
- 目录结构（节选）：
  - `pages/index/visitAdd.vue`：访客预约
  - `pages/index/visitList/visitList.vue`：访客记录列表
  - `pages/index/visitList/visitViewQr.vue`：访客二维码
  - `pages/index/visitResult/visitResult.vue`：预约结果页
  - `common/allUrl.js`：接口地址与环境配置
  - `unpackage/dist/build/h5`：H5 构建产物
  - `unpackage/dist/build/smartDoorVisit`：自定义构建目录产物

## 平台核心功能
- 访客预约：提交被访人、到访时间、来访事由等信息
- 二维码通行：生成/展示一次性或有效期内的访客二维码
- 访客记录：查看历史预约与通行状态
- 结果反馈：预约成功/失败与异常态提示（如网络异常）
- 资源适配：统一图标与样式，移动端交互优化

## 平台独特优势
- 多端发布能力：基于 uni-app，H5 快速上线，同时可扩展到小程序/APP
- 快速对接：接口集中在 `common/allUrl.js`，便于环境切换与网关适配
- 轻量易用：页面结构清晰、依赖少、上手快
- 二维码内置：集成 `uqrcode`，无需额外三方依赖
- 可拓展桥接：通过 `common/bridge.js` 便捷接入原生/硬件能力

## 平台安装使用
1) 环境准备
   - Node.js 16+（建议 LTS）
   - 包管理器 npm 或 yarn
   - 可选：HBuilderX（便于 uni-app 项目运行与构建）

2) 获取代码
```bash
git clone <your-repo-url>
cd smartDoorVisit
```

3) 安装依赖
```bash
npm install
# 或
yarn
```

4) 本地运行（H5）
```bash
npm run dev:h5
```
启动后通过终端输出的本地地址访问；如使用 HBuilderX，可选择「运行到浏览器」。

5) 构建发布（H5）
```bash
npm run build:h5
```
构建产物默认输出至 `unpackage/dist/build/h5/` 或 `unpackage/dist/build/smartDoorVisit/`（视构建配置而定），将目录内容部署到任意静态资源服务器（如 Nginx、OSS、CDN）。

6) 接口与环境配置
- 按需修改 `common/allUrl.js` 中的网关地址、接口前缀与环境开关
- 如需要拓展鉴权、签名或埋点，可在 `main.js` 或相关 `common/*` 中统一注入

## 应用场景及案例说明
- 社区通行：访客提前预约，到访时出示二维码通行，减少前台登记时间
- 园区访客：企业访客/供应商预约与管理，统一通行口径与安全审计
- 写字楼/联合办公：自助预约与到访确认，分时段/多入口灵活控制
- 校园/医院：家属/临时访客规范入校/入院流程，降低人力成本
- 工地与封闭园区：按时段预约入场，提升安全与合规记录可追溯性

> 注：本项目为前端仓库，需与后端门禁/物联网服务对接方可实现验码通行与权限校验能力。

## 技术交流
![技术交流群](https://i.postimg.cc/RZ0sjnYP/front-End-Component.jpg)