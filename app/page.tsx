import { createClient } from '@/utils/supabase/server'
import Dashboard from '@/components/Dashboard'
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
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
          Failed to load articles: {error.message}
        </p>
      </div>
    )
  }

  return <Dashboard articles={articles as Article[]} currentUser={user?.email || 'Guest View'} />
}
