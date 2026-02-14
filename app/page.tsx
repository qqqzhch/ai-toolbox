import Hero from './components/Hero'
import UseCaseGrid from './components/UseCaseGrid'
import ToolList from './components/ToolList'
import { getAllTools } from './lib/tools'

export default function Home() {
  const tools = getAllTools()
  const featuredTools = tools.slice(0, 6)

  return (
    <main className="min-h-screen">
      <Hero />
      <UseCaseGrid />
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">热门工具</h2>
          <a href="/tools.html" className="text-primary-600 hover:text-primary-700 font-medium">
            查看全部 →
          </a>
        </div>
        <ToolList tools={featuredTools} />
      </section>
    </main>
  )
}
