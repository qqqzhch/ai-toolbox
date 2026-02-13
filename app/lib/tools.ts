import toolsData from '../../data/tools.json'

export type Category = 
  | 'coding'
  | 'design'
  | 'writing'
  | 'audio'
  | 'productivity'
  | 'chat'
  | 'image'
  | 'other'

export type Pricing = 'free' | 'freemium' | 'paid'

export interface Tool {
  id: string
  name: string
  nameEn?: string
  description: string
  category: Category
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

export function getAllTools(): Tool[] {
  return toolsData as Tool[]
}

export function getToolById(id: string): Tool | undefined {
  return getAllTools().find(tool => tool.id === id)
}

export function getToolsByCategory(category: Category): Tool[] {
  return getAllTools().filter(tool => tool.category === category)
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
