export type Pillar =
  | 'ai_quality'
  | 'unified'
  | 'enterprise'
  | 'competitive'
  | 'practitioner'

export type FunnelStage = 'tofu' | 'mofu' | 'bofu' | 'implementation'

export type Status =
  | 'not_started'
  | 'in_draft'
  | 'drafted'
  | 'awaiting_proofread'
  | 'published'

export type Track = 'track_1' | 'track_2' | 'both' | null

export type LaunchWave = 'launch_day' | 'displacement_wave' | 'ongoing' | null

export type Competitor = 'tricentis' | 'browserstack' | 'smartbear' | 'testmu'

export interface Article {
  id: string
  number: number
  title: string
  pillar: Pillar
  funnel_stage: FunnelStage
  article_type: string
  track: Track
  competitors: Competitor[]
  launch_wave: LaunchWave
  status: Status
  assignee: string | null
  publish_by: string | null
  published_url: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface ArticleComment {
  id: string
  article_id: string
  author_name: string
  body: string
  created_at: string
}

// ─── Display helpers ─────────────────────────────────────────

export const PILLAR_LABELS: Record<Pillar, string> = {
  ai_quality: 'AI quality platform',
  unified: 'Unified platform',
  enterprise: 'Enterprise scale',
  competitive: 'Competitive',
  practitioner: 'Practitioner',
}

export const STAGE_LABELS: Record<FunnelStage, string> = {
  tofu: 'TOFU — Awareness',
  mofu: 'MOFU — Consideration',
  bofu: 'BOFU — Decision',
  implementation: 'Implementation',
}

export const STAGE_DESCRIPTIONS: Record<FunnelStage, string> = {
  tofu: 'Problem-aware — capture demand, build authority, earn AI citations',
  mofu: 'Solution-aware — own the alternatives and comparison landscape',
  bofu: 'Product-aware — reduce friction at point of decision, support sales',
  implementation: 'Post-purchase — drive activation, reduce time-to-value, support PLG',
}

export const STATUS_LABELS: Record<Status, string> = {
  not_started: 'Not started',
  in_draft: 'In draft',
  drafted: 'Drafted',
  awaiting_proofread: 'Awaiting proofread',
  published: 'Published',
}

export const COMPETITOR_LABELS: Record<Competitor, string> = {
  tricentis: 'Tricentis',
  browserstack: 'BrowserStack',
  smartbear: 'SmartBear',
  testmu: 'TestMu',
}

export const TRACK_LABELS: Record<NonNullable<Track>, string> = {
  track_1: 'Track 1 — Demo',
  track_2: 'Track 2 — Trial',
  both: 'Both tracks',
}

export const LAUNCH_WAVE_LABELS: Record<NonNullable<LaunchWave>, string> = {
  launch_day: 'By April 7',
  displacement_wave: 'By April 14',
  ongoing: 'Ongoing',
}

export const ASSIGNEE_OPTIONS = ['Unassigned', 'You', 'Huyen'] as const
