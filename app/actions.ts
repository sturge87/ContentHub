'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Status } from '@/types'

export async function updateStatus(id: string, status: Status) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('articles')
    .update({ status })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
}

export async function updateAssignee(id: string, assignee: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('articles')
    .update({ assignee: assignee === 'Unassigned' ? null : assignee })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
}

export async function updateNotes(id: string, notes: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('articles')
    .update({ notes })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
}

export async function updatePublishedUrl(id: string, published_url: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('articles')
    .update({ published_url })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
}

export async function addComment(article_id: string, author_name: string, body: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('article_comments')
    .insert({ article_id, author_name, body })
  if (error) throw new Error(error.message)
  revalidatePath('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
}
