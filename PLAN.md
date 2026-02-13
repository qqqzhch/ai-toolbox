# AI工具导航站 - 项目规划

## 项目信息
- **名称**: AI工具库 / AIToolBox (暂定)
- **定位**: 中文 AI 工具导航，国内可用优先
- **目标用户**: 中文开发者、独立开发者、数字工作者

## 核心功能 MVP
1. 工具分类浏览
2. 标签筛选（免费/付费、中文/英文、国内可用/需翻墙）
3. 搜索功能
4. 工具详情页
5. 用户提交工具

## 数据结构
```typescript
interface Tool {
  id: string;
  name: string;           // 工具名称
  nameEn?: string;        // 英文名称
  description: string;    // 简介
  category: Category;     // 分类
  tags: Tag[];            // 标签
  pricing: 'free' | 'freemium' | 'paid';  // 价格
  chinaAvailable: boolean; // 国内是否可用
  needVPN: boolean;       // 是否需要梯子
  website: string;        // 官网链接
  affiliate?: string;     // 推广链接
  features: string[];     // 核心功能
  pros: string[];         // 优点
  cons: string[];         // 缺点
  testedDate: string;     // 测试日期
  isActive: boolean;      // 是否有效
}

type Category = 
  | 'coding'      // 编程开发
  | 'design'      // 设计创意
  | 'writing'     // 写作内容
  | 'audio'       // 音频视频
  | 'productivity' // 效率工具
  | 'chat'        // AI对话
  | 'image'       // 图像生成
  | 'other';      // 其他
```

## 技术栈
- Next.js 14 + App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- 数据: JSON 文件（初期）→ Notion CMS（后期）

## 页面结构
- /                 - 首页（热门工具 + 分类入口）
- /tools            - 工具列表（筛选 + 搜索）
- /tools/[id]       - 工具详情
- /category/[slug]  - 分类页面
- /submit           - 提交工具
- /about            - 关于页面

## Affiliate 计划清单
- Claude/Anthropic - 有推荐计划
- Notion - 有推荐计划  
- Vercel - 有推荐计划
- Replicate - 有推荐计划
- 国内工具看具体情况

## 种子工具清单（首批30个）
### 编程开发
- GitHub Copilot
- Codeium
- Cursor
- 通义灵码（阿里）
- CodeGeeX（智谱）

### AI对话
-  Claude (需翻墙)
- ChatGPT (需翻墙)
- 文心一言（百度）
- 通义千问（阿里）
- Kimi (月之暗面)
- 智谱清言
- 讯飞星火

### 设计创意
- Midjourney (需翻墙)
- Stable Diffusion
- 文心一格（百度）
- 通义万相（阿里）
- Canva AI

### 写作内容
- Jasper
- Copy.ai (需翻墙)
- 写作猫
- Notion AI

### 效率工具
- Monica (浏览器插件)
- Poe
- Perplexity (需翻墙)
- 秘塔 AI 搜索
