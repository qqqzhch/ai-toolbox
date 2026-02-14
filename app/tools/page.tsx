'use client'

import { Suspense } from 'react'
import ToolsContent from './ToolsContent'

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">加载中...</div>}>
      <ToolsContent />
    </Suspense>
  )
}
