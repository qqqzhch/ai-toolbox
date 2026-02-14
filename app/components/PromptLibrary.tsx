'use client'

import { useState } from 'react'
import { PromptItem } from '../lib/tools'
import { Copy, Check, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'

interface PromptLibraryProps {
  prompts: PromptItem[]
  title?: string
}

export default function PromptLibrary({ prompts, title = "常用 Prompt 模板" }: PromptLibraryProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const handleCopy = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content)
    setCopiedId(index)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (prompts.length === 0) return null

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
          点击复制即用
        </span>
      </div>

      <div className="space-y-3">
        {prompts.map((prompt, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-green-100 overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === index ? null : index)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-green-50/50 transition-colors"
            >
              <span className="font-medium text-gray-800 text-left">{prompt.title}</span>
              {expandedId === index ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            
            {expandedId === index && (
              <div className="px-4 pb-4">
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 relative group">
                  <p className="pr-8 leading-relaxed">{prompt.content}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopy(prompt.content, index)
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white shadow-sm hover:shadow transition-all"
                    title="复制"
                  >
                    {copiedId === index ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  💡 提示：复制后粘贴到 AI 工具中使用
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
