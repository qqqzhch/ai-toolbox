'use client'

import { useState } from 'react'
import { SubScene } from '../lib/tools'
import { Target, Sparkles } from 'lucide-react'

interface SubSceneTabsProps {
  subScenes: SubScene[]
  activeSubScene: string | null
  onSubSceneChange: (subSceneId: string | null) => void
}

export default function SubSceneTabs({ 
  subScenes, 
  activeSubScene, 
  onSubSceneChange 
}: SubSceneTabsProps) {
  if (subScenes.length === 0) return null

  return (
    <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          你要做什么？
        </h3>
        <span className="text-sm text-gray-500">
          选择具体任务，获得更精准的工具推荐
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* "全部" 选项 */}
        <button
          onClick={() => onSubSceneChange(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSubScene === null
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          全部
        </button>

        {/* 子场景选项 */}
        {subScenes.map((subScene) => (
          <button
            key={subScene.id}
            onClick={() => onSubSceneChange(subScene.id)}
            className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSubScene === subScene.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{subScene.label}</span>
              {activeSubScene === subScene.id && (
                <Sparkles className="w-3.5 h-3.5" />
              )}
            </div>
            
            {/* 悬停提示 */}
            {subScene.description && (
              <div className={`absolute left-0 right-0 top-full mt-2 z-10 ${
                activeSubScene === subScene.id ? 'block' : 'hidden group-hover:block'
              }`}>
                <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                  {subScene.description}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
