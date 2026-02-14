'use client'

import { 
  Code, 
  Search,
  PenTool,
  Palette,
  BarChart3,
  Zap,
  LucideIcon
} from 'lucide-react'
import { getUseCases, getToolsByUseCase, type UseCase } from '../lib/tools'

const iconMap: Record<string, LucideIcon> = {
  Code,
  Search,
  PenTool,
  Palette,
  BarChart3,
  Zap
}

export default function UseCaseGrid() {
  const useCases = getUseCases()
  const allTools = require('../../data/tools.json')

  // 计算每个场景的工具数量
  const getToolCount = (useCaseId: UseCase) => {
    return allTools.filter((tool: any) => 
      tool.useCases?.includes(useCaseId)
    ).length
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            你遇到什么问题了？
          </h2>
          <p className="text-gray-600 text-lg">
            选择你的使用场景，找到最适合的 AI 工具
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => {
            const Icon = iconMap[useCase.iconName]
            const toolCount = getToolCount(useCase.id)
            
            return (
              <a
                key={useCase.id}
                href={`/use-case/${useCase.id}.html`}
                className="group p-6 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all bg-white"
              >
                {/* 图标 */}
                <div className={`inline-flex p-3 rounded-xl ${useCase.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                
                {/* 标题和描述 */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-500 mb-4 leading-relaxed">
                  {useCase.subtitle}
                </p>
                
                {/* 示例工具 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {useCase.exampleTools.slice(0, 3).map((tool) => (
                    <span 
                      key={tool}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                
                {/* 工具数量 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-400">
                    {toolCount} 个工具
                  </span>
                  <span className="text-sm font-medium text-primary-600 group-hover:translate-x-1 transition-transform">
                    查看全部 →
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
