import { notFound } from 'next/navigation'
import { getToolsByCategory, getCategoryName, Category, getCategories } from '../../lib/tools'
import ToolList from '../../components/ToolList'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  const categories = getCategories()
  return categories.map((cat) => ({
    slug: cat.id,
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.slug as Category
  const tools = getToolsByCategory(category)
  const categoryName = getCategoryName(category)

  if (tools.length === 0 && !['coding', 'chat', 'image', 'writing', 'productivity', 'design'].includes(category)) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <a href="/index.html" className="hover:text-primary-600">首页</a>
            <span>/</span>
            <span>分类</span>
            <span>/</span>
            <span className="text-gray-900">{categoryName}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{categoryName}工具</h1>
          <p className="mt-2 text-gray-600">
            共 {tools.length} 个精选工具
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ToolList tools={tools} />
      </div>
    </main>
  )
}
