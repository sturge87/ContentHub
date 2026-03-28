import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ArticleBoard from '@/components/ArticleBoard'
import { signOut } from './actions'
import type { Article } from '@/types'

export default async function Home() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  // if (!user) redirect('/login')

  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('number', { ascending: true })

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load articles: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <header className="border-b border-stone-200 bg-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-stone-900 text-sm">Katalon Content Board</span>
          <span className="text-stone-300 text-sm">·</span>
          <span className="text-stone-500 text-xs">True Platform launch</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-stone-400">{user?.email || 'Guest View'}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="text-xs text-stone-500 hover:text-stone-900 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      {/* Board */}
      <main className="px-6 py-6 max-w-7xl mx-auto">
        <ArticleBoard articles={articles as Article[]} currentUser={user?.email || 'Guest View'} />
      </main>
    </div>
  )
}
