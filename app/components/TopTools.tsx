'use client'

import { getTopRatedTools, getToolById, type UseCase } from '../lib/tools'
import { Trophy, Star } from 'lucide-react'

interface TopToolsProps {
  useCase: UseCase
}

export default function TopTools({ useCase }: TopToolsProps) {
  const topTools = getTopRatedTools(useCase, 3)

  if (topTools.length === 0) return null

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-600" />
        <h3 className="text-lg font-semibold text-gray-900">本场景热门工具</h3>
        <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
          用户评分最高
        </span>
      </div>

      <div className="space-y-3">
        {topTools.map((item, index) => {
          const tool = getToolById(item.toolId)
          if (!tool) return null

          return (
            <div
              key={item.toolId}
              className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm"
            >
              <span className="text-2xl">{medals[index]}</span>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{tool.name}</h4>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{item.stats.average}</span>
                  </div>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500">{item.stats.count} 人评价</span>
                </div>
              </div>
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg hover:bg-yellow-200 transition-colors"
              >
                试试
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
