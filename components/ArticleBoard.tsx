'use client'

import { useState, useOptimistic, useTransition } from 'react'
import type {
  Article, FunnelStage, Pillar, Status, Competitor,
} from '@/types'
import {
  PILLAR_LABELS, STAGE_LABELS, STAGE_DESCRIPTIONS,
  STATUS_LABELS, COMPETITOR_LABELS, TRACK_LABELS, LAUNCH_WAVE_LABELS,
  ASSIGNEE_OPTIONS,
} from '@/types'
import { updateStatus, updateAssignee, updatePublishBy, updatePublishedUrl } from '@/app/actions'

// ─── Colour maps ─────────────────────────────────────────────

const PILLAR_STYLES: Record<Pillar, string> = {
  ai_quality: 'bg-blue-50 text-blue-700 border border-blue-200',
  unified: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  enterprise: 'bg-violet-50 text-violet-700 border border-violet-200',
  competitive: 'bg-orange-50 text-orange-700 border border-orange-200',
  practitioner: 'bg-stone-100 text-stone-600 border border-stone-200',
}

const STATUS_STYLES: Record<Status, string> = {
  not_started: 'bg-stone-100 text-stone-500',
  in_draft: 'bg-amber-100 text-amber-700',
  drafted: 'bg-blue-100 text-blue-700',
  awaiting_proofread: 'bg-violet-100 text-violet-700',
  published: 'bg-emerald-100 text-emerald-700',
}

const STAGE_COUNTS: Record<FunnelStage, number> = {
  tofu: 12, mofu: 20, bofu: 10, implementation: 8,
}

const STAGES: FunnelStage[] = ['tofu', 'mofu', 'bofu', 'implementation']

const COMPETITORS: Competitor[] = ['tricentis', 'browserstack', 'smartbear', 'testmu']

const PILLARS_BY_STAGE: Record<FunnelStage, Pillar[]> = {
  tofu: ['ai_quality', 'unified', 'enterprise'],
  mofu: ['enterprise', 'competitive', 'unified'],
  bofu: ['enterprise', 'competitive'],
  implementation: ['practitioner', 'ai_quality'],
}

// ─── Props ───────────────────────────────────────────────────

interface Props {
  articles: Article[]
  currentUser: string
}

// ─── Component ───────────────────────────────────────────────

export default function ArticleBoard({ articles: initial, currentUser }: Props) {
  const [articles, setArticles] = useState<Article[]>(initial)
  const [activeStage, setActiveStage] = useState<FunnelStage | 'all'>('all')
  const [activePillar, setActivePillar] = useState<Pillar | 'all'>('all')
  const [activeCompetitor, setActiveCompetitor] = useState<Competitor | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'number' | 'publish_by'>('number')
  const [, startTransition] = useTransition()

  // Summary counts by status across all articles
  const totalByStatus = (status: Status) =>
    articles.filter(a => a.status === status).length

  // Filter articles for current view
  const visible = articles.filter(a => {
    if (activeStage !== 'all' && a.funnel_stage !== activeStage) return false
    if (activePillar !== 'all' && a.pillar !== activePillar) return false
    if (activeCompetitor !== 'all' && !a.competitors.includes(activeCompetitor)) return false
    return true
  }).sort((a, b) => {
    if (sortBy === 'publish_by') {
      const dateA = a.publish_by ? new Date(a.publish_by).getTime() : Infinity
      const dateB = b.publish_by ? new Date(b.publish_by).getTime() : Infinity
      if (dateA !== dateB) return dateA - dateB
      return a.number - b.number
    }
    return a.number - b.number
  })

  // Optimistic status update
  function handleStatusChange(id: string, status: Status) {
    const article = articles.find(a => a.id === id)
    let url = article?.published_url || null
    if (status === 'published' && !url) {
      const input = window.prompt('Please enter the final published URL:')
      if (input) url = input
    }
    setArticles(prev =>
      prev.map(a => a.id === id ? { ...a, status, published_url: url } : a)
    )
    startTransition(async () => {
      if (url && url !== article?.published_url) {
        await updatePublishedUrl(id, url)
      }
      await updateStatus(id, status)
    })
  }

  // Optimistic assignee update
  function handleAssigneeChange(id: string, assignee: string) {
    setArticles(prev =>
      prev.map(a => a.id === id ? { ...a, assignee: assignee === 'Unassigned' ? null : assignee } : a)
    )
    startTransition(async () => {
      await updateAssignee(id, assignee)
    })
  }

  // Optimistic publish by date update
  function handlePublishByChange(id: string, publish_by: string) {
    setArticles(prev =>
      prev.map(a => a.id === id ? { ...a, publish_by: publish_by || null } : a)
    )
    startTransition(async () => {
      await updatePublishBy(id, publish_by || null)
    })
  }

  // Reset pillar/competitor filters when switching stages
  function handleStageChange(stage: FunnelStage | 'all') {
    setActiveStage(stage)
    setActivePillar('all')
    setActiveCompetitor('all')
  }

  return (
    <div className="space-y-6">

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(
          [
            { label: 'Total articles', value: articles.length, color: 'text-stone-900' },
            { label: 'In progress', value: totalByStatus('in_draft') + totalByStatus('drafted') + totalByStatus('awaiting_proofread'), color: 'text-amber-700' },
            { label: 'Published', value: totalByStatus('published'), color: 'text-emerald-700' },
            { label: 'Not started', value: totalByStatus('not_started'), color: 'text-stone-400' },
          ] as const
        ).map(stat => (
          <div key={stat.label} className="bg-white border border-stone-200 rounded-xl p-4">
            <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-stone-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Stage tabs ── */}
      <div className="border-b border-stone-200 flex gap-0 overflow-x-auto">
        <button
          onClick={() => handleStageChange('all')}
          className={`px-4 py-2.5 text-sm border-b-2 transition-colors whitespace-nowrap -mb-px ${activeStage === 'all'
            ? 'border-stone-900 text-stone-900 font-medium'
            : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
        >
          All stages
          <span className={`ml-1.5 text-xs ${activeStage === 'all' ? 'text-stone-500' : 'text-stone-400'}`}>
            {articles.length}
          </span>
        </button>
        {STAGES.map(stage => (
          <button
            key={stage}
            onClick={() => handleStageChange(stage)}
            className={`px-4 py-2.5 text-sm border-b-2 transition-colors whitespace-nowrap -mb-px ${activeStage === stage
              ? 'border-stone-900 text-stone-900 font-medium'
              : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
          >
            {STAGE_LABELS[stage]}
            <span className={`ml-1.5 text-xs ${activeStage === stage ? 'text-stone-500' : 'text-stone-400'}`}>
              {STAGE_COUNTS[stage]}
            </span>
          </button>
        ))}
      </div>

      {/* ── Stage description ── */}
      <p className="text-xs text-stone-500 -mt-4">
        {activeStage === 'all' ? 'View all planned articles across the entire funnel' : STAGE_DESCRIPTIONS[activeStage]}
      </p>

      {/* ── Pillar filters ── */}
      <div className="flex flex-wrap gap-2">
        <FilterPill
          label="All"
          active={activePillar === 'all'}
          onClick={() => setActivePillar('all')}
          activeClass="bg-stone-900 text-white border-stone-900"
        />
        {(activeStage === 'all' ? (Object.keys(PILLAR_LABELS) as Pillar[]) : PILLARS_BY_STAGE[activeStage]).map(pillar => (
          <FilterPill
            key={pillar}
            label={PILLAR_LABELS[pillar]}
            active={activePillar === pillar}
            onClick={() => setActivePillar(activePillar === pillar ? 'all' : pillar)}
            activeClass={PILLAR_STYLES[pillar]}
          />
        ))}

        {/* Competitor filters — MOFU only */}
        {(activeStage === 'mofu' || activeStage === 'all') && (
          <>
            <span className="text-stone-300 text-sm self-center">|</span>
            {COMPETITORS.map(comp => (
              <FilterPill
                key={comp}
                label={COMPETITOR_LABELS[comp]}
                active={activeCompetitor === comp}
                onClick={() => {
                  setActiveCompetitor(activeCompetitor === comp ? 'all' : comp)
                  setActivePillar('all')
                }}
                activeClass="bg-orange-50 text-orange-700 border-orange-300"
              />
            ))}
          </>
        )}
      </div>

      {/* ── Sorting & Article list ── */}
      <div className="flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'number' | 'publish_by')}
          className="text-xs text-stone-600 bg-white border border-stone-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-stone-300"
        >
          <option value="number">Sort by Pipeline Order</option>
          <option value="publish_by">Sort by Target Release Date</option>
        </select>
      </div>

      <div className="space-y-1.5">
        {visible.length === 0 && (
          <p className="text-sm text-stone-400 py-4 text-center">No articles match this filter.</p>
        )}

        {visible.map(article => (
          <ArticleRow
            key={article.id}
            article={article}
            expanded={expandedId === article.id}
            onToggle={() => setExpandedId(expandedId === article.id ? null : article.id)}
            onStatusChange={handleStatusChange}
            onAssigneeChange={handleAssigneeChange}
            onPublishByChange={handlePublishByChange}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Filter pill ─────────────────────────────────────────────

function FilterPill({
  label, active, onClick, activeClass,
}: {
  label: string
  active: boolean
  onClick: () => void
  activeClass: string
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs border transition-all ${active
        ? activeClass
        : 'bg-white border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-700'
        }`}
    >
      {label}
    </button>
  )
}

// ─── Article row ─────────────────────────────────────────────

function ArticleRow({
  article, expanded, onToggle, onStatusChange, onAssigneeChange, onPublishByChange,
}: {
  article: Article
  expanded: boolean
  onToggle: () => void
  onStatusChange: (id: string, status: Status) => void
  onAssigneeChange: (id: string, assignee: string) => void
  onPublishByChange: (id: string, publish_by: string) => void
}) {
  return (
    <div className={`bg-white border rounded-xl transition-all ${expanded ? 'border-stone-300' : 'border-stone-200 hover:border-stone-300'
      }`}>
      {/* Main row */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer"
        onClick={onToggle}
      >
        {/* Number */}
        <span className="text-xs text-stone-400 w-6 shrink-0 tabular-nums">
          {String(article.number).padStart(2, '0')}
        </span>

        {/* Title */}
        <span className="flex-1 text-sm text-stone-800 leading-snug min-w-0 truncate">
          {article.title}
        </span>

        {/* Tags (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <span className={`px-2 py-0.5 rounded-full text-xs border ${PILLAR_STYLES[article.pillar]}`}>
            {PILLAR_LABELS[article.pillar]}
          </span>

          {article.track && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-stone-50 border border-stone-200 text-stone-500">
              {TRACK_LABELS[article.track]}
            </span>
          )}

          {article.launch_wave && article.launch_wave !== 'ongoing' && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-rose-50 text-rose-600 border border-rose-200">
              {LAUNCH_WAVE_LABELS[article.launch_wave]}
            </span>
          )}
        </div>

        {/* Status select — stop propagation so click doesn't toggle expand */}
        <div onClick={e => e.stopPropagation()} className="shrink-0">
          <select
            value={article.status}
            onChange={e => onStatusChange(article.id, e.target.value as Status)}
            className={`text-xs px-2 py-1 rounded-full border-0 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-stone-300 ${STATUS_STYLES[article.status]}`}
          >
            {(Object.keys(STATUS_LABELS) as Status[]).map(s => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>

        {/* Expand chevron */}
        <span className={`text-stone-400 text-xs transition-transform shrink-0 ${expanded ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </div>

      {/* Expanded detail panel */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-stone-100 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">

            {/* Assignee */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Assignee</label>
              <select
                value={article.assignee ?? 'Unassigned'}
                onChange={e => onAssigneeChange(article.id, e.target.value)}
                className="w-full text-sm px-3 py-1.5 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-300"
              >
                {ASSIGNEE_OPTIONS.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Article type */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Article type</label>
              <p className="text-sm text-stone-700 py-1.5">{article.article_type.replace(/_/g, ' ')}</p>
            </div>

            {/* Target Release */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Target release</label>
              <input
                type="date"
                value={article.publish_by ?? ''}
                onChange={e => onPublishByChange(article.id, e.target.value)}
                className="w-full text-sm px-3 py-1.5 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-300"
              />
            </div>
          </div>

          {/* Competitors */}
          {article.competitors.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Competitors</label>
              <div className="flex gap-2 flex-wrap">
                {article.competitors.map(c => (
                  <span key={c} className="px-2 py-0.5 text-xs rounded-full bg-orange-50 border border-orange-200 text-orange-700">
                    {COMPETITOR_LABELS[c as Competitor]}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Published URL */}
          {article.published_url && (
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Published URL</label>
              <a
                href={article.published_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline truncate block"
              >
                {article.published_url}
              </a>
            </div>
          )}

          {/* Notes */}
          {article.notes && (
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Notes</label>
              <p className="text-sm text-stone-600 whitespace-pre-wrap">{article.notes}</p>
            </div>
          )}

          {/* Updated */}
          <p className="text-xs text-stone-400">
            Last updated {new Date(article.updated_at).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
            })}
          </p>
        </div>
      )}
    </div>
  )
}
