'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, X } from 'lucide-react'
import { getAllTools, getCategories, searchTools, Category } from '../lib/tools'
import ToolList from '../components/ToolList'

export default function ToolsContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [selectedPricing, setSelectedPricing] = useState<'all' | 'free' | 'paid'>('all')
  const [chinaOnly, setChinaOnly] = useState(false)

  const allTools = getAllTools()
  const categories = getCategories()

  const filteredTools = useMemo(() => {
    let result = allTools

    // 搜索过滤
    if (searchQuery) {
      result = searchTools(searchQuery)
    }

    // 分类过滤
    if (selectedCategory !== 'all') {
      result = result.filter(tool => tool.category === selectedCategory)
    }

    // 价格过滤
    if (selectedPricing !== 'all') {
      if (selectedPricing === 'free') {
        result = result.filter(tool => tool.pricing === 'free')
      } else {
        result = result.filter(tool => tool.pricing === 'paid' || tool.pricing === 'freemium')
      }
    }

    // 国内可用过滤
    if (chinaOnly) {
      result = result.filter(tool => tool.chinaAvailable)
    }

    return result
  }, [allTools, searchQuery, selectedCategory, selectedPricing, chinaOnly])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedPricing('all')
    setChinaOnly(false)
  }

  const hasFilters = searchQuery || selectedCategory !== 'all' || selectedPricing !== 'all' || chinaOnly

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">全部工具</h1>
          
          {/* 搜索栏 */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索工具..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* 筛选器 */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">筛选：</span>
            </div>

            {/* 分类筛选 */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">全部分类</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            {/* 价格筛选 */}
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">全部价格</option>
              <option value="free">免费</option>
              <option value="paid">付费/增值</option>
            </select>

            {/* 国内可用 */}
            <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={chinaOnly}
                onChange={(e) => setChinaOnly(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm">仅国内可用</span>
            </label>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
                清除筛选
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 工具列表 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            共 <span className="font-semibold text-gray-900">{filteredTools.length}</span> 个工具
          </p>
        </div>

        <ToolList tools={filteredTools} />

        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">没有找到符合条件的工具</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
