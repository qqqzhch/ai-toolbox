'use client'

import { useState } from 'react'
import { Tool } from '../lib/tools'
import { X, Check, Minus, Scale } from 'lucide-react'

interface ToolCompareProps {
  tools: Tool[]
  selectedIds: string[]
  onClose: () => void
}

export default function ToolCompare({ tools, selectedIds, onClose }: ToolCompareProps) {
  const selectedTools = tools.filter(t => selectedIds.includes(t.id)).slice(0, 2) // 最多对比2个

  if (selectedTools.length < 2) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <p className="text-gray-600 text-center">请至少选择2个工具进行对比</p>
          <button 
            onClick={onClose}
            className="mt-4 w-full py-2 bg-primary-600 text-white rounded-lg"
          >
            知道了
          </button>
        </div>
      </div>
    )
  }

  const [tool1, tool2] = selectedTools

  const compareItems = [
    { label: '价格', key: 'pricing', render: (t: Tool) => 
      t.pricing === 'free' ? '免费' : t.pricing === 'freemium' ? '免费增值' : '付费' 
    },
    { label: '国内可用', key: 'china', render: (t: Tool) => 
      t.chinaAvailable ? <Check className="w-5 h-5 text-green-600" /> : <X className="w-5 h-5 text-red-500" />
    },
    { label: '核心功能', key: 'features', render: (t: Tool) => 
      <ul className="text-sm text-gray-600 space-y-1">
        {t.features.slice(0, 3).map((f, i) => <li key={i}>• {f}</li>)}
      </ul>
    },
    { label: '优点', key: 'pros', render: (t: Tool) => 
      <ul className="text-sm text-green-700 space-y-1">
        {t.pros.slice(0, 2).map((p, i) => <li key={i}>✓ {p}</li>)}
      </ul>
    },
    { label: '缺点', key: 'cons', render: (t: Tool) => 
      <ul className="text-sm text-orange-700 space-y-1">
        {t.cons.slice(0, 2).map((c, i) => <li key={i}>✗ {c}</li>)}
      </ul>
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* 头部 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900">工具对比</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 对比表格 */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {/* 表头 */}
            <div className="font-medium text-gray-500">对比项</div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-primary-700">{tool1.name}</h3>
              <p className="text-xs text-gray-500">{tool1.nameEn}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-primary-700">{tool2.name}</h3>
              <p className="text-xs text-gray-500">{tool2.nameEn}</p>
            </div>

            {/* 分割线 */}
            <div className="col-span-3 h-px bg-gray-200" />

            {/* 对比行 */}
            {compareItems.map((item) => (
              <div key={item.key} className="contents">
                <div className="py-3 text-sm font-medium text-gray-600 flex items-center">
                  {item.label}
                </div>
                <div className="py-3 px-4 bg-gray-50 rounded-lg flex items-center justify-center">
                  {item.render(tool1)}
                </div>
                <div className="py-3 px-4 bg-gray-50 rounded-lg flex items-center justify-center">
                  {item.render(tool2)}
                </div>
              </div>
            ))}
          </div>

          {/* 建议 */}
          <div className="mt-6 p-4 bg-primary-50 rounded-xl">
            <p className="text-sm text-primary-800">
              <span className="font-semibold">💡 建议：</span>
              {tool1.pricing === 'free' && tool2.pricing !== 'free' 
                ? `${tool1.name} 完全免费，适合预算有限的用户；${tool2.name} 功能更强大，适合专业需求。`
                : tool1.chinaAvailable && !tool2.chinaAvailable
                ? `${tool1.name} 国内可直接访问；${tool2.name} 需要翻墙但通常能力更强。`
                : '两个工具各有优势，建议根据具体需求选择。'
              }
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="mt-6 flex gap-3">
            <a
              href={tool1.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700"
            >
              访问 {tool1.name}
            </a>
            <a
              href={tool2.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700"
            >
              访问 {tool2.name}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
