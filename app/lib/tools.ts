import toolsData from '../../data/tools.json'

// 保留原有分类（作为技术标签）
export type Category = 
  | 'coding'
  | 'design'
  | 'writing'
  | 'audio'
  | 'productivity'
  | 'chat'
  | 'image'
  | 'other'

// 新增：使用场景（问题导向）
export type UseCase =
  | 'code'           // 写代码、Debug、学习编程
  | 'research'       // 搜索资料、整理信息
  | 'write'          // 写文章、文案、邮件
  | 'design'         // 做图、设计、视觉创意
  | 'analyze'        // 数据分析、文档处理
  | 'automate'       // 自动化、提效
  | 'learn'          // 学习新知识
  | 'create'         // 内容创作、多媒体

export type Pricing = 'free' | 'freemium' | 'paid'

export interface Tool {
  id: string
  name: string
  nameEn?: string
  description: string
  category: Category
  useCases: UseCase[]     // 新增：适用场景（可多选）
  tags: string[]
  pricing: Pricing
  chinaAvailable: boolean
  needVPN: boolean
  website: string
  affiliate?: string
  features: string[]
  pros: string[]
  cons: string[]
  testedDate: string
  isActive: boolean
}

// ========== 工具数据操作 ==========

export function getAllTools(): Tool[] {
  return toolsData as Tool[]
}

export function getToolById(id: string): Tool | undefined {
  return getAllTools().find(tool => tool.id === id)
}

export function getToolsByCategory(category: Category): Tool[] {
  return getAllTools().filter(tool => tool.category === category)
}

// 新增：按使用场景获取工具
export function getToolsByUseCase(useCase: UseCase): Tool[] {
  return getAllTools().filter(tool => 
    tool.useCases?.includes(useCase)
  )
}

export function getToolsByTag(tag: string): Tool[] {
  return getAllTools().filter(tool => 
    tool.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  )
}

export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase()
  return getAllTools().filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.nameEn?.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

// ========== 分类/场景定义 ==========

// 保留：原有分类（技术分类）
export function getCategories(): { id: Category; name: string }[] {
  return [
    { id: 'coding', name: '编程开发' },
    { id: 'chat', name: 'AI对话' },
    { id: 'image', name: '图像生成' },
    { id: 'writing', name: '写作内容' },
    { id: 'productivity', name: '效率工具' },
    { id: 'design', name: '设计创意' },
    { id: 'audio', name: '音频视频' },
    { id: 'other', name: '其他' },
  ]
}

export function getCategoryName(categoryId: Category): string {
  const category = getCategories().find(c => c.id === categoryId)
  return category?.name || categoryId
}

// 新增：使用场景定义（问题导向）
export interface UseCaseInfo {
  id: UseCase
  title: string           // 场景标题（用户语言）
  subtitle: string        // 场景描述
  iconName: string        // 图标名称
  color: string           // 配色
  exampleTools: string[]  // 示例工具名称
}

export function getUseCases(): UseCaseInfo[] {
  return [
    {
      id: 'code',
      title: '写代码 & Debug',
      subtitle: 'AI 辅助编程、代码审查、学习新技术',
      iconName: 'Code',
      color: 'bg-blue-100 text-blue-600',
      exampleTools: ['GitHub Copilot', 'Cursor', '通义灵码']
    },
    {
      id: 'research',
      title: '搜索 & 研究',
      subtitle: '快速找资料、整理信息、深度研究',
      iconName: 'Search',
      color: 'bg-purple-100 text-purple-600',
      exampleTools: ['秘塔 AI 搜索', 'Kimi', 'Perplexity']
    },
    {
      id: 'write',
      title: '写作 & 文案',
      subtitle: '文章创作、营销文案、润色改写',
      iconName: 'PenTool',
      color: 'bg-green-100 text-green-600',
      exampleTools: ['Claude', 'ChatGPT', 'Kimi']
    },
    {
      id: 'design',
      title: '做图 & 设计',
      subtitle: 'AI 绘画、海报设计、视觉创意',
      iconName: 'Palette',
      color: 'bg-pink-100 text-pink-600',
      exampleTools: ['Midjourney', '通义万相', 'Canva']
    },
    {
      id: 'analyze',
      title: '分析 & 处理',
      subtitle: '数据分析、文档处理、决策辅助',
      iconName: 'BarChart3',
      color: 'bg-orange-100 text-orange-600',
      exampleTools: ['ChatGPT', 'Claude', 'Kimi']
    },
    {
      id: 'automate',
      title: '提效 & 自动化',
      subtitle: '自动化工作流、提升办公效率',
      iconName: 'Zap',
      color: 'bg-yellow-100 text-yellow-600',
      exampleTools: ['Notion AI', 'Monica', '通义听悟']
    }
  ]
}

export function getUseCaseById(id: UseCase): UseCaseInfo | undefined {
  return getUseCases().find(u => u.id === id)
}

// ========== 子场景（细分引导）==========

export interface SubScene {
  id: string
  label: string          // 显示名称
  description?: string   // 简短描述
  recommendedTools: string[]  // 推荐工具ID列表（按优先级排序）
}

export interface UseCaseWithSubScenes extends UseCaseInfo {
  subScenes: SubScene[]
}

export function getUseCaseWithSubScenes(useCaseId: UseCase): UseCaseWithSubScenes | undefined {
  const base = getUseCaseById(useCaseId)
  if (!base) return undefined

  const subScenesMap: Record<UseCase, SubScene[]> = {
    code: [
      { id: 'debug', label: 'Debug错误', description: '查找和修复代码中的bug', recommendedTools: ['cursor', 'claude', 'github-copilot'] },
      { id: 'new-feature', label: '写新功能', description: '从零编写新功能代码', recommendedTools: ['github-copilot', 'cursor', 'tongyi-lingma'] },
      { id: 'learn', label: '学习新技术', description: '理解和学习陌生的代码/框架', recommendedTools: ['chatgpt', 'claude', 'kimi'] },
      { id: 'review', label: 'Code Review', description: '审查和优化现有代码', recommendedTools: ['claude', 'cursor', 'github-copilot'] },
    ],
    research: [
      { id: 'quick-search', label: '快速查找', description: '快速搜索特定信息', recommendedTools: ['metaso', 'chatgpt', 'kimi'] },
      { id: 'deep-research', label: '深度研究', description: '系统性调研某个主题', recommendedTools: ['kimi', 'claude', 'chatgpt'] },
      { id: 'summarize', label: '整理总结', description: '总结长文档/多篇文章', recommendedTools: ['kimi', 'claude', 'tongyi-qianwen'] },
      { id: 'academic', label: '学术研究', description: '查阅论文、写文献综述', recommendedTools: ['kimi', 'chatgpt', 'claude'] },
    ],
    write: [
      { id: 'article', label: '写文章', description: '公众号/博客/知乎文章', recommendedTools: ['claude', 'chatgpt', 'kimi'] },
      { id: 'copywriting', label: '营销文案', description: '广告/小红书/朋友圈文案', recommendedTools: ['chatgpt', 'wenxin-yiyan', 'zhipu-qingyan'] },
      { id: 'email', label: '写邮件', description: '商务邮件、正式信函', recommendedTools: ['claude', 'chatgpt', 'kimi'] },
      { id: 'polish', label: '润色改写', description: '优化和改写已有内容', recommendedTools: ['claude', 'kimi', 'chatgpt'] },
    ],
    design: [
      { id: 'illustration', label: '插画创作', description: '艺术风格插画', recommendedTools: ['midjourney', 'tongyi-wanxiang'] },
      { id: 'poster', label: '海报设计', description: '宣传海报/封面设计', recommendedTools: ['tongyi-wanxiang', 'wenxin-yiyan', 'midjourney'] },
      { id: 'ui', label: 'UI/UX设计', description: '界面设计、原型图', recommendedTools: ['chatgpt', 'claude'] },
      { id: 'photo', label: '图片处理', description: '修图、抠图、换背景', recommendedTools: ['tongyi-wanxiang', 'midjourney'] },
    ],
    analyze: [
      { id: 'data', label: '数据分析', description: '处理数据、生成图表', recommendedTools: ['chatgpt', 'claude', 'kimi'] },
      { id: 'document', label: '文档处理', description: '解读合同/报告/论文', recommendedTools: ['kimi', 'claude', 'tongyi-qianwen'] },
      { id: 'decision', label: '决策辅助', description: '分析利弊、提供建议', recommendedTools: ['claude', 'chatgpt', 'kimi'] },
    ],
    automate: [
      { id: 'notes', label: '笔记整理', description: '整理会议/学习笔记', recommendedTools: ['kimi', 'claude'] },
      { id: 'workflow', label: '工作流', description: '自动化重复性工作', recommendedTools: ['chatgpt', 'claude'] },
      { id: 'meeting', label: '会议辅助', description: '会议记录、待办提取', recommendedTools: ['kimi', 'chatgpt'] },
    ],
    learn: [],
    create: [],
  }

  return {
    ...base,
    subScenes: subScenesMap[useCaseId] || []
  }
}

// ========== Prompt 库 ==========

import promptsData from '../../data/prompts.json'

export interface PromptItem {
  title: string
  content: string
}

export interface PromptGroup {
  id: string
  useCase: UseCase
  subScene?: string
  prompts: PromptItem[]
}

export function getPromptsBySubScene(useCase: UseCase, subScene?: string): PromptItem[] {
  const groups = promptsData as PromptGroup[]
  const group = groups.find(
    g => g.useCase === useCase && (subScene ? g.subScene === subScene : !g.subScene)
  )
  return group?.prompts || []
}

export function getPromptsByUseCase(useCase: UseCase): PromptItem[] {
  const groups = promptsData as PromptGroup[]
  return groups
    .filter(g => g.useCase === useCase)
    .flatMap(g => g.prompts)
}

// ========== 工作流 ==========

import workflowsData from '../../data/workflows.json'

export interface WorkflowStep {
  order: number
  title: string
  description: string
  recommendedTools: string[]
  tips: string[]
}

export interface Workflow {
  id: string
  title: string
  description: string
  useCase: UseCase
  steps: WorkflowStep[]
}

export function getWorkflowsByUseCase(useCase: UseCase): Workflow[] {
  const workflows = workflowsData as Workflow[]
  return workflows.filter(w => w.useCase === useCase)
}

export function getAllWorkflows(): Workflow[] {
  return workflowsData as Workflow[]
}

// ========== 评价系统 ==========

import ratingsData from '../../data/ratings.json'

export interface Rating {
  toolId: string
  useCase: UseCase
  rating: number  // 1-5
  comment: string
  author: string
  date: string
}

export interface RatingStats {
  average: number
  count: number
  distribution: Record<number, number>  // 1-5星各多少条
}

// 获取某工具在某场景下的所有评价
export function getRatings(toolId: string, useCase: UseCase): Rating[] {
  const ratings = ratingsData as Rating[]
  return ratings.filter(r => r.toolId === toolId && r.useCase === useCase)
}

// 获取某工具在某场景下的评分统计
export function getRatingStats(toolId: string, useCase: UseCase): RatingStats {
  const ratings = getRatings(toolId, useCase)
  
  if (ratings.length === 0) {
    return { average: 0, count: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } }
  }

  const sum = ratings.reduce((acc, r) => acc + r.rating, 0)
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  
  ratings.forEach(r => {
    distribution[r.rating] = (distribution[r.rating] || 0) + 1
  })

  return {
    average: Math.round((sum / ratings.length) * 10) / 10,
    count: ratings.length,
    distribution
  }
}

// 获取某场景下评分最高的工具
export function getTopRatedTools(useCase: UseCase, limit: number = 3): { toolId: string; stats: RatingStats }[] {
  const allTools = getAllTools()
  const toolsInUseCase = allTools.filter(t => t.useCases.includes(useCase))
  
  const rated = toolsInUseCase
    .map(tool => ({
      toolId: tool.id,
      stats: getRatingStats(tool.id, useCase)
    }))
    .filter(item => item.stats.count > 0)
    .sort((a, b) => b.stats.average - a.stats.average)
  
  return rated.slice(0, limit)
}
