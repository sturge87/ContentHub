import type { Status } from '@/types'
import { STATUS_LABELS } from '@/types'

const STATUS_STYLES: Record<Status, string> = {
  not_started:        'bg-stone-100 text-stone-500',
  in_draft:           'bg-amber-100 text-amber-700',
  drafted:            'bg-blue-100 text-blue-700',
  awaiting_proofread: 'bg-violet-100 text-violet-700',
  published:          'bg-emerald-100 text-emerald-700',
}

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}
