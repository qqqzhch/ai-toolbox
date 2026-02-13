import { Tool } from '../lib/tools'
import { ExternalLink, Check, X, Star } from 'lucide-react'

interface ToolListProps {
  tools: Tool[]
}

export default function ToolList({ tools }: ToolListProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        暂无工具数据
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <div
          key={tool.id}
          className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all bg-white"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {tool.name}
              </h3>
              {tool.nameEn && (
                <p className="text-xs text-gray-400">{tool.nameEn}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {tool.chinaAvailable ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  <Check className="w-3 h-3" />
                  国内可用
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                  <X className="w-3 h-3" />
                  需翻墙
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {tool.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium ${
                tool.pricing === 'free' ? 'text-green-600' :
                tool.pricing === 'freemium' ? 'text-primary-600' :
                'text-orange-600'
              }`}>
                {tool.pricing === 'free' ? '免费' :
                 tool.pricing === 'freemium' ? '免费增值' :
                 '付费'}
              </span>
              <span className="text-xs text-gray-400">
                {tool.testedDate} 测试
              </span>
            </div>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              访问官网
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
