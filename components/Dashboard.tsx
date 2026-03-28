'use client'

import { useState } from 'react'
import ArticleBoard from './ArticleBoard'
import CalendarView from './CalendarView'
import type { Article } from '@/types'
import { signOut } from '@/app/actions'

interface Props {
    articles: Article[]
    currentUser: string
}

export default function Dashboard({ articles, currentUser }: Props) {
    const [view, setView] = useState<'board' | 'calendar'>('board')

    return (
        <div className="flex min-h-screen bg-stone-50">
            {/* Sidebar */}
            <aside className="w-64 border-r border-stone-200 bg-white flex flex-col shrink-0">
                <div className="p-6 border-b border-stone-200">
                    <h1 className="font-semibold text-stone-900 text-sm">Katalon Content Board</h1>
                    <p className="text-stone-500 text-xs mt-1">True Platform launch</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <button
                        onClick={() => setView('board')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'board' ? 'bg-stone-100 text-stone-900' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                            }`}
                    >
                        Board
                    </button>
                    <button
                        onClick={() => setView('calendar')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'calendar' ? 'bg-stone-100 text-stone-900' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                            }`}
                    >
                        Content Calendar
                    </button>
                </nav>

                <div className="p-4 border-t border-stone-200">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-stone-400 truncate">{currentUser}</span>
                        <form action={signOut}>
                            <button
                                type="submit"
                                className="w-full text-left text-xs text-stone-500 hover:text-stone-900 transition-colors"
                            >
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden">
                <div className="p-6 h-full">
                    {view === 'board' && <ArticleBoard articles={articles} currentUser={currentUser} />}
                    {view === 'calendar' && <CalendarView articles={articles} />}
                </div>
            </main>
        </div>
    )
}
