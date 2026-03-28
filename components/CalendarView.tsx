'use client'

import { useState } from 'react'
import type { Article } from '@/types'
import { STATUS_LABELS } from '@/types'

const STATUS_COLORS: Record<string, string> = {
    not_started: 'bg-stone-100 text-stone-500 border-stone-200',
    in_draft: 'bg-amber-100 text-amber-700 border-amber-200',
    drafted: 'bg-blue-100 text-blue-700 border-blue-200',
    awaiting_proofread: 'bg-violet-100 text-violet-700 border-violet-200',
    published: 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

interface Props {
    articles: Article[]
}

export default function CalendarView({ articles }: Props) {
    const [currentDate, setCurrentDate] = useState(new Date())

    // Calendar logic
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const startingDayOfWeek = firstDayOfMonth.getDay() // 0 = Sunday

    const previousMonth = () => setCurrentDate(new Date(year, month - 1, 1))
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

    // Group articles by date
    const articlesByDate: Record<number, Article[]> = {}
    articles.forEach(article => {
        if (!article.publish_by) return
        // Assuming publish_by is 'YYYY-MM-DD'
        const [aYear, aMonth, aDay] = article.publish_by.split('-').map(Number)
        if (aYear === year && aMonth - 1 === month) {
            if (!articlesByDate[aDay]) articlesByDate[aDay] = []
            articlesByDate[aDay].push(article)
        }
    })

    // Build grid blocks
    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} className="bg-stone-50/50 min-h-[100px]" />)
    }
    for (let d = 1; d <= daysInMonth; d++) {
        const dayArticles = articlesByDate[d] || []
        const isToday = new Date().getDate() === d && new Date().getMonth() === month && new Date().getFullYear() === year

        days.push(
            <div key={d} className={`bg-white p-2 min-h-[100px] flex flex-col ${isToday ? 'bg-blue-50/20' : ''}`}>
                <span className={`text-xs font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full shrink-0 ${isToday ? 'bg-blue-600 text-white' : 'text-stone-400'}`}>
                    {d}
                </span>
                <div className="flex flex-col gap-1.5 overflow-y-auto pr-1">
                    {dayArticles.map(a => (
                        <div key={a.id} className={`text-[10px] px-1.5 py-1.5 leading-tight rounded-md border truncate shrink-0 ${STATUS_COLORS[a.status] || 'bg-stone-100 text-stone-600 border-stone-200'}`}>
                            <span className="font-semibold block opacity-80 mb-0.5">{STATUS_LABELS[a.status]}</span>
                            {a.title}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Pad the end of the month to complete the last row
    const totalCells = days.length
    const paddingNeeded = (7 - (totalCells % 7)) % 7
    for (let i = 0; i < paddingNeeded; i++) {
        days.push(<div key={`empty-end-${i}`} className="bg-stone-50/50 min-h-[100px]" />)
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return (
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col h-[calc(100vh-3rem)] max-h-[900px]">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-white">
                <h2 className="font-semibold text-lg text-stone-800">
                    {monthNames[month]} {year}
                </h2>
                <div className="flex gap-2">
                    <button onClick={previousMonth} className="px-3 py-1.5 text-xs font-medium text-stone-600 border border-stone-200 bg-white rounded-md hover:bg-stone-50 transition-colors">
                        &larr; Prev
                    </button>
                    <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 text-xs font-medium text-stone-600 border border-stone-200 bg-white rounded-md hover:bg-stone-50 transition-colors">
                        Today
                    </button>
                    <button onClick={nextMonth} className="px-3 py-1.5 text-xs font-medium text-stone-600 border border-stone-200 bg-white rounded-md hover:bg-stone-50 transition-colors">
                        Next &rarr;
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 border-b border-stone-200 bg-stone-50 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2.5 text-center">{day}</div>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-7 auto-rows-fr bg-stone-200 gap-[1px] overflow-y-auto">
                {days}
            </div>
        </div>
    )
}
