'use client'

import { Search, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/tools?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>亲测国内可用，持续更新</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          发现最好用的
          <span className="text-primary-600"> AI 工具</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          精选中文 AI 工具导航，国内网络可用优先。
          按使用场景发现工具：写代码、做研究、搞设计、写文章...
        </p>

        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索 AI 工具，如：代码生成、AI绘画..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              搜索
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm text-gray-500">
          <span>热门搜索：</span>
          {['ChatGPT', 'AI编程', 'Midjourney', 'Kimi', '文心一言'].map((tag) => (
            <button
              key={tag}
              onClick={() => router.push(`/tools?q=${tag}`)}
              className="px-3 py-1 rounded-full bg-white border border-gray-200 hover:border-primary-300 hover:text-primary-600 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
