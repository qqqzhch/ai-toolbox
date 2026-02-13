import { 
  Code, 
  Palette, 
  MessageSquare, 
  Image as ImageIcon,
  Zap,
  PenTool
} from 'lucide-react'

const categories = [
  {
    id: 'coding',
    name: '编程开发',
    description: 'AI 代码补全、生成、审查工具',
    icon: Code,
    color: 'bg-blue-100 text-blue-600',
    count: 15
  },
  {
    id: 'chat',
    name: 'AI 对话',
    description: '智能聊天、问答、助手',
    icon: MessageSquare,
    color: 'bg-purple-100 text-purple-600',
    count: 12
  },
  {
    id: 'image',
    name: '图像生成',
    description: 'AI 绘画、设计、图像处理',
    icon: ImageIcon,
    color: 'bg-pink-100 text-pink-600',
    count: 8
  },
  {
    id: 'writing',
    name: '写作内容',
    description: '文案生成、文章写作、翻译',
    icon: PenTool,
    color: 'bg-green-100 text-green-600',
    count: 10
  },
  {
    id: 'productivity',
    name: '效率工具',
    description: '搜索、笔记、自动化工具',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600',
    count: 6
  },
  {
    id: 'design',
    name: '设计创意',
    description: 'UI/UX、视频、音频工具',
    icon: Palette,
    color: 'bg-orange-100 text-orange-600',
    count: 7
  }
]

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
          按分类浏览
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <a
                key={category.id}
                href={`/category/${category.id}`}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all bg-white"
              >
                <div className={`inline-flex p-3 rounded-xl ${category.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">
                  {category.description}
                </p>
                <span className="text-xs text-gray-400">
                  {category.count} 个工具
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
