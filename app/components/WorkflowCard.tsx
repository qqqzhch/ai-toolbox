'use client'

import { useState } from 'react'
import { Workflow } from '../lib/tools'
import { Workflow as WorkflowIcon, ChevronRight, Lightbulb, CheckCircle2 } from 'lucide-react'

interface WorkflowCardProps {
  workflows: Workflow[]
}

export default function WorkflowCard({ workflows }: WorkflowCardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (workflows.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <WorkflowIcon className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-900">推荐工作流</h3>
        <span className="text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
          多工具组合完成任务
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className="bg-white rounded-xl border border-orange-100 overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === workflow.id ? null : workflow.id)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-orange-50/30 transition-colors"
            >
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">{workflow.title}</h4>
                <p className="text-sm text-gray-500 mt-0.5">{workflow.description}</p>
              </div>
              <ChevronRight 
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedId === workflow.id ? 'rotate-90' : ''
                }`} 
              />
            </button>

            {expandedId === workflow.id && (
              <div className="px-5 pb-5">
                <div className="space-y-4">
                  {workflow.steps.map((step, index) => (
                    <div key={step.order} className="relative">
                      {/* 连接线 */}
                      {index < workflow.steps.length - 1 && (
                        <div className="absolute left-4 top-8 w-0.5 h-full bg-orange-200" />
                      )}
                      
                      <div className="flex gap-4">
                        {/* 步骤序号 */}
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">
                          {step.order}
                        </div>
                        
                        {/* 步骤内容 */}
                        <div className="flex-1 pb-2">
                          <h5 className="font-medium text-gray-900">{step.title}</h5>
                          <p className="text-sm text-gray-600 mt-0.5">{step.description}</p>
                          
                          {/* 推荐工具 */}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">推荐工具：</span>
                            <div className="flex gap-1">
                              {step.recommendedTools.map((toolId) => (
                                <span 
                                  key={toolId}
                                  className="text-xs px-2 py-0.5 bg-orange-50 text-orange-700 rounded"
                                >
                                  {toolId}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* 小贴士 */}
                          <div className="mt-2 space-y-1">
                            {step.tips.map((tip, tipIndex) => (
                              <div key={tipIndex} className="flex items-start gap-1.5">
                                <Lightbulb className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-gray-500">{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 底部提示 */}
                <div className="mt-4 pt-4 border-t border-orange-100 flex items-center gap-2 text-sm text-orange-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>按顺序使用工具，效率翻倍</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
