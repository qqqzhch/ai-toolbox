'use client'

import { useState } from 'react'
import { RatingStats, Rating } from '../lib/tools'
import { Star, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'

interface RatingDisplayProps {
  stats: RatingStats
  ratings: Rating[]
  toolName: string
  showDetail?: boolean
}

export default function RatingDisplay({ stats, ratings, toolName, showDetail = false }: RatingDisplayProps) {
  const [expanded, setExpanded] = useState(false)

  if (stats.count === 0) {
    return (
      <div className="flex items-center gap-1 text-gray-400 text-sm">
        <Star className="w-4 h-4" />
        <span>暂无评价</span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* 评分摘要 */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold text-gray-900">{stats.average}</span>
        </div>
        <span className="text-sm text-gray-500">({stats.count} 条评价)</span>
        
        {showDetail && ratings.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-2 text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {expanded ? '收起' : '查看'}
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* 评分分布条形图 */}
      {showDetail && (
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.distribution[star] || 0
            const percentage = stats.count > 0 ? (count / stats.count) * 100 : 0
            
            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-6 text-gray-500">{star}星</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-gray-400">{count}</span>
              </div>
            )
          })}
        </div>
      )}

      {/* 评价详情 */}
      {expanded && ratings.length > 0 && (
        <div className="mt-3 space-y-3 pt-3 border-t border-gray-100">
          {ratings.slice(0, 3).map((rating, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rating.rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">{rating.date}</span>
              </div>
              <p className="text-sm text-gray-700">{rating.comment}</p>
            </div>
          ))}
          {ratings.length > 3 && (
            <p className="text-xs text-center text-gray-400">
              还有 {ratings.length - 3} 条评价...
            </p>
          )}
        </div>
      )}
    </div>
  )
}
