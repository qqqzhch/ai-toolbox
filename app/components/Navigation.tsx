'use client'

import { useState } from 'react'
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import Link from 'next/link'

const useCases = [
  { id: 'code', name: '写代码', href: '/use-case/code.html' },
  { id: 'research', name: '搜索研究', href: '/use-case/research.html' },
  { id: 'write', name: '写作', href: '/use-case/write.html' },
  { id: 'design', name: '做图设计', href: '/use-case/design.html' },
  { id: 'analyze', name: '分析处理', href: '/use-case/analyze.html' },
  { id: 'automate', name: '提效自动化', href: '/use-case/automate.html' },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/index.html" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              AI工具库
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/index.html" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              首页
            </Link>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                使用场景
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {useCases.map((useCase) => (
                    <Link
                      key={useCase.id}
                      href={useCase.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      {useCase.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              href="/tools.html" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              全部工具
            </Link>

            <Link 
              href="/category/coding.html" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              分类
            </Link>

            <Link 
              href="#about" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              关于
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="space-y-2">
              <Link
                href="/index.html"
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-gray-500 mb-2">使用场景</p>
                <div className="pl-4 space-y-1">
                  {useCases.map((useCase) => (
                    <Link
                      key={useCase.id}
                      href={useCase.href}
                      className="block py-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {useCase.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/tools.html"
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                全部工具
              </Link>

              <Link
                href="/category/coding.html"
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                分类
              </Link>

              <Link
                href="#about"
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                关于
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
