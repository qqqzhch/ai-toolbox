import { notFound } from 'next/navigation'
import { getToolsByUseCase, getUseCaseWithSubScenes, type UseCase, getUseCases } from '../../lib/tools'
import UseCaseContent from '../../components/UseCaseContent'

interface UseCasePageProps {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  const useCases = getUseCases()
  return useCases.map((uc) => ({
    id: uc.id,
  }))
}

export default function UseCasePage({ params }: UseCasePageProps) {
  const useCaseId = params.id as UseCase
  const useCase = getUseCaseWithSubScenes(useCaseId)
  
  if (!useCase) {
    notFound()
  }
  
  const tools = getToolsByUseCase(useCaseId)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* 面包屑 */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <a href="/index.html" className="hover:text-primary-600">首页</a>
            <span>/</span>
            <span className="text-gray-900">{useCase.title}</span>
          </div>
          
          {/* 标题 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {useCase.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {useCase.subtitle}
          </p>
          <p className="text-sm text-gray-500">
            共 {tools.length} 个精选工具
          </p>
        </div>
      </div>

      {/* 工具列表 + 筛选器 + 子场景 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <UseCaseContent 
          tools={tools} 
          title={useCase.title}
          subtitle={useCase.subtitle}
          subScenes={useCase.subScenes}
          useCaseId={useCaseId}
        />
      </div>
    </main>
  )
}
