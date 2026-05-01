export type NavItem = { label: string; href: string }

export type NavGroup =
  | { label: string; href: string }
  | { label: string; items: NavItem[] }

export const siteNavGroups: NavGroup[] = [
  { label: 'Home', href: '/' },
  {
    label: 'People',
    items: [
      { label: 'Contributors', href: '/contributors' },
      { label: 'Log in', href: '/login' },
      { label: 'Profile', href: '/profile' },
      { label: 'Members', href: '/#members' },
      { label: 'Partners', href: '/#partners' }
    ]
  },
  {
    label: 'Content',
    items: [
      { label: 'Programs', href: '/#programs' },
      { label: 'Event', href: '/events' },
      { label: 'Resources', href: '/#resources' }
    ]
  },
  {
    label: 'Brand',
    items: [{ label: 'Media Kit', href: '/#media-kit' }]
  }
]
