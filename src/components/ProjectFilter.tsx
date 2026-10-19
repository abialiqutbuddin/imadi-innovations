'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Document } from '@/lib/content'
import { Picture } from './ui'

export function ProjectFilter({
  projects,
  allLabel = 'All projects',
  emptyLabel = 'More work is on the way.',
}: {
  projects: Document[]
  allLabel?: string
  emptyLabel?: string
}) {
  const [active, setActive] = useState('all')
  const category = (p: Document): string[] =>
    Array.isArray(p.categories)
      ? p.categories
          .map((c: unknown) => (typeof c === 'string' ? c : (c as Document).label))
          .filter(Boolean)
      : p.category
        ? [p.category]
        : []
  const categories = [...new Set(projects.flatMap(category))]
  const visible = active === 'all' ? projects : projects.filter((p) => category(p).includes(active))
  return (
    <div>
      <div className="filter-bar" role="group" aria-label="Filter projects">
        <button aria-pressed={active === 'all'} onClick={() => setActive('all')}>
          {allLabel}
        </button>
        {categories.map((c) => (
          <button key={c} aria-pressed={active === c} onClick={() => setActive(c)}>
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visible.length} projects
      </p>
      <div className="project-grid">
        {visible.map((project) => (
          <Link className="project-card" key={project.id} href={`/projects/${project.slug}`}>
            <Picture
              media={project.coverImage || project.cover}
              fallback={project.fallbackImage}
              alt={project.title}
            />
            <h2>
              {project.title}
              <span aria-hidden="true"> ↗</span>
            </h2>
            <p>{project.summary}</p>
            <div className="tags">
              {category(project).map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      {!visible.length ? <p className="empty-state">{emptyLabel}</p> : null}
    </div>
  )
}
