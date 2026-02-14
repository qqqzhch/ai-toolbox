'use client'

import { useState, useMemo } from 'react'
import { Tool, Pricing } from '../lib/tools'
import { Filter, ArrowUpDown } from 'lucide-react'

interface FilterBarProps {
  tools: Tool[]
  onFilterChange: (filteredTools: Tool[]) => void
}

type PriceFilter = 'all' | 'free' | 'freemium' | 'paid'
type AvailabilityFilter = 'all' | 'china' | 'vpn'
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name'

export default function FilterBar({ tools, onFilterChange }: FilterBarProps) {
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all')
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all')
  const [sortOption, setSortOption] = useState<SortOption>('default')
  const [isExpanded, setIsExpanded] = useState(false)

  const filteredTools = useMemo(() => {
    let result = [...tools]

    // 价格筛选
    if (priceFilter !== 'all') {
      result = result.filter(tool => tool.pricing === priceFilter)
    }

    // 可用性筛选
    if (availabilityFilter === 'china') {
      result = result.filter(tool => tool.chinaAvailable)
    } else if (availabilityFilter === 'vpn') {
      result = result.filter(tool => tool.needVPN)
    }

    // 排序
    switch (sortOption) {
      case 'price-asc':
        const priceOrder: Record<Pricing, number> = { free: 0, freemium: 1, paid: 2 }
        result.sort((a, b) => priceOrder[a.pricing] - priceOrder[b.pricing])
        break
      case 'price-desc':
        const priceOrderDesc: Record<Pricing, number> = { free: 2, freemium: 1, paid: 0 }
        result.sort((a, b) => priceOrderDesc[a.pricing] - priceOrderDesc[b.pricing])
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
        break
    }

    return result
  }, [tools, priceFilter, availabilityFilter, sortOption])

  // 当筛选条件变化时，通知父组件
  useMemo(() => {
    onFilterChange(filteredTools)
  }, [filteredTools, onFilterChange])

  const activeFiltersCount = 
    (priceFilter !== 'all' ? 1 : 0) + 
    (availabilityFilter !== 'all' ? 1 : 0)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* 顶部栏 - 始终显示 */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            筛选
            {activeFiltersCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </span>
          <span className="text-sm text-gray-400">
            共 {filteredTools.length} 个工具
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* 快捷排序 */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="default">默认排序</option>
            <option value="price-asc">价格：低到高</option>
            <option value="price-desc">价格：高到低</option>
            <option value="name">名称</option>
          </select>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium px-3 py-1.5"
          >
            {isExpanded ? '收起' : '更多筛选'}
          </button>
        </div>
      </div>

      {/* 展开的高级筛选 */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 价格筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                价格
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: '全部' },
                  { value: 'free', label: '免费' },
                  { value: 'freemium', label: '免费增值' },
                  { value: 'paid', label: '付费' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPriceFilter(option.value as PriceFilter)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      priceFilter === option.value
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 可用性筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                网络访问
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: '全部' },
                  { value: 'china', label: '国内可用' },
                  { value: 'vpn', label: '需翻墙' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAvailabilityFilter(option.value as AvailabilityFilter)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      availabilityFilter === option.value
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 重置按钮 */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setPriceFilter('all')
                  setAvailabilityFilter('all')
                  setSortOption('default')
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                重置所有筛选
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
