'use client'

import { ChevronRight } from 'lucide-react'
import type { NavGroup } from '@/lib/nav-config'

type Props = {
  groups: NavGroup[]
  onNavigate: () => void
}

export default function SiteMobileMenu({ groups, onNavigate }: Props) {
  return (
    <div className="lg:hidden mt-2 max-h-[min(70vh,520px)] overflow-y-auto overscroll-contain rounded-2xl border border-border bg-popover/95 p-2 shadow-xl backdrop-blur-sm ring-1 ring-border/60">
      {groups.map((group) => (
        <section key={group.label} className="mb-2 last:mb-0 overflow-hidden rounded-xl border border-border bg-card/50">
          {'href' in group && group.href ? (
            <a
              href={group.href}
              onClick={onNavigate}
              className="flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium text-foreground transition hover:bg-muted active:bg-muted"
            >
              <span>{group.label}</span>
              <ChevronRight size={16} className="shrink-0 text-muted-foreground" aria-hidden />
            </a>
          ) : (
            <>
              <div className="border-b border-border bg-muted/50 px-4 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  {group.label}
                </p>
              </div>
              {'items' in group &&
                group.items?.map((item, idx) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    className={`flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium text-foreground transition hover:bg-muted active:bg-muted ${
                      idx > 0 ? 'border-t border-border/80' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={16} className="shrink-0 text-muted-foreground" aria-hidden />
                  </a>
                ))}
            </>
          )}
        </section>
      ))}
    </div>
  )
}
