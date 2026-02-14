'use client'

import { useState, useMemo } from 'react'
import { Tool, SubScene, getPromptsBySubScene, getWorkflowsByUseCase, getRatings, getRatingStats } from '../lib/tools'
import ToolList from './ToolList'
import FilterBar from './FilterBar'
import SubSceneTabs from './SubSceneTabs'
import ToolCompare from './ToolCompare'
import PromptLibrary from './PromptLibrary'
import WorkflowCard from './WorkflowCard'
import RatingDisplay from './RatingDisplay'
import TopTools from './TopTools'
import { Scale } from 'lucide-react'

interface UseCaseContentProps {
  tools: Tool[]
  title: string
  subtitle: string
  subScenes: SubScene[]
  useCaseId: string
}

export default function UseCaseContent({ tools, title, subtitle, subScenes, useCaseId }: UseCaseContentProps) {
  const [filteredTools, setFilteredTools] = useState(tools)
  const [activeSubScene, setActiveSubScene] = useState<string | null>(null)
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [showCompare, setShowCompare] = useState(false)

  // 根据子场景筛选工具
  const toolsBySubScene = useMemo(() => {
    if (!activeSubScene) return filteredTools
    
    const subScene = subScenes.find(s => s.id === activeSubScene)
    if (!subScene) return filteredTools

    const recommendedIds = subScene.recommendedTools
    const sorted = [...filteredTools].sort((a, b) => {
      const indexA = recommendedIds.indexOf(a.id)
      const indexB = recommendedIds.indexOf(b.id)
      
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB
      }
      if (indexA !== -1) return -1
      if (indexB !== -1) return 1
      return 0
    })

    return sorted
  }, [filteredTools, activeSubScene, subScenes])

  // 高亮推荐工具
  const highlightedToolIds = useMemo(() => {
    if (!activeSubScene) return []
    const subScene = subScenes.find(s => s.id === activeSubScene)
    return subScene?.recommendedTools.slice(0, 2) || []
  }, [activeSubScene, subScenes])

  // 获取当前子场景的 Prompts
  const prompts = useMemo(() => {
    return getPromptsBySubScene(useCaseId as any, activeSubScene || undefined)
  }, [useCaseId, activeSubScene])

  // 获取工作流
  const workflows = useMemo(() => {
    return getWorkflowsByUseCase(useCaseId as any)
  }, [useCaseId])

  // 切换对比选择
  const toggleCompare = (toolId: string) => {
    setCompareIds(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId)
      }
      if (prev.length >= 2) {
        return [prev[1], toolId]
      }
      return [...prev, toolId]
    })
  }

  return (
    <div className="space-y-6">
      {/* 热门工具排行榜 */}
      <TopTools useCase={useCaseId as any} />

      {/* 工作流展示 */}
      {workflows.length > 0 && (
        <WorkflowCard workflows={workflows} />
      )}

      {/* 子场景引导 */}
      {subScenes.length > 0 && (
        <SubSceneTabs 
          subScenes={subScenes}
          activeSubScene={activeSubScene}
          onSubSceneChange={setActiveSubScene}
        />
      )}

      {/* Prompt 库 */}
      {prompts.length > 0 && (
        <PromptLibrary 
          prompts={prompts}
          title={`${activeSubScene ? '这个任务' : '这个场景'}的 Prompt 模板`}
        />
      )}
      
      {/* 筛选器和对比栏 */}
      <div className="space-y-4">
        <FilterBar tools={tools} onFilterChange={setFilteredTools} />
        
        {/* 对比选择栏 */}
        {compareIds.length > 0 && (
          <div className="bg-primary-50 border border-primary-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary-600" />
              <span className="text-sm text-primary-800">
                已选择 {compareIds.length}/2 个工具对比
              </span>
              <span className="text-xs text-primary-600">
                {compareIds.map(id => tools.find(t => t.id === id)?.name).join(' vs ')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {compareIds.length === 2 && (
                <button
                  onClick={() => setShowCompare(true)}
                  className="px-4 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700"
                >
                  开始对比
                </button>
              )}
              <button
                onClick={() => setCompareIds([])}
                className="px-3 py-1.5 text-sm text-primary-600 hover:text-primary-700"
              >
                清空
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* 推荐提示 */}
      {activeSubScene && highlightedToolIds.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 flex items-center gap-2">
          <span className="text-yellow-700 text-sm">
            <span className="font-medium">💡 推荐：</span>
            这个任务最适合用 
            {highlightedToolIds.map((id, i) => {
              const tool = tools.find(t => t.id === id)
              return (
                <span key={id}>
                  <span className="font-semibold text-yellow-800">{tool?.name}</span>
                  {i < highlightedToolIds.length - 1 ? ' 或 ' : ''}
                </span>
              )
            })}
          </span>
        </div>
      )}
      
      {/* 工具列表 */}
      {toolsBySubScene.length > 0 ? (
        <div className="space-y-4">
          {compareIds.length > 0 && compareIds.length < 2 && (
            <p className="text-sm text-gray-500 text-center">
              再选择 {2 - compareIds.length} 个工具即可对比
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsBySubScene.map((tool) => {
              const isHighlighted = highlightedToolIds.includes(tool.id)
              const isSelected = compareIds.includes(tool.id)
              const ratings = getRatings(tool.id, useCaseId as any)
              const ratingStats = getRatingStats(tool.id, useCaseId as any)
              
              return (
                <div
                  key={tool.id}
                  className={`group relative p-6 rounded-2xl border transition-all bg-white ${
                    isHighlighted 
                      ? 'border-primary-300 shadow-lg ring-2 ring-primary-100' 
                      : 'border-gray-100 hover:border-primary-200 hover:shadow-lg'
                  } ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
                >
                  <label className="absolute top-4 right-4 z-10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCompare(tool.id)}
                      className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="sr-only">选择对比</span>
                  </label>

                  {isHighlighted && (
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      ⭐ 推荐
                    </div>
                  )}

                  <div className="pr-8">
                    <div className="mb-4">
                      <h3 className={`text-lg font-semibold transition-colors ${
                        isHighlighted ? 'text-primary-700' : 'text-gray-900 group-hover:text-primary-600'
                      }`}>
                        {tool.name}
                      </h3>
                      {tool.nameEn && (
                        <p className="text-xs text-gray-400">{tool.nameEn}</p>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {tool.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded-full text-xs ${
                            isHighlighted 
                              ? 'bg-primary-50 text-primary-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 评分显示 */}
                    <div className="mb-4">
                      <RatingDisplay 
                        stats={ratingStats} 
                        ratings={ratings}
                        toolName={tool.name}
                        showDetail={true}
                      />
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
                      </div>
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        访问官网 →
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 mb-2">没有找到符合条件的工具</p>
          <p className="text-sm text-gray-400">尝试调整筛选条件</p>
        </div>
      )}

      {/* 对比弹窗 */}
      {showCompare && (
        <ToolCompare
          tools={tools}
          selectedIds={compareIds}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  )
}
