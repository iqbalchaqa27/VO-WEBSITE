import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Admin Dashboard - IKAQ',
  description: 'Manage IKAQ content',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-muted/30 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">IKAQ Jabodetabek</p>
        </div>

        <nav className="space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/sliders">
            <Button variant="ghost" className="w-full justify-start">
              Sliders
            </Button>
          </Link>
          <Link href="/admin/news">
            <Button variant="ghost" className="w-full justify-start">
              News
            </Button>
          </Link>
          <Link href="/admin/articles">
            <Button variant="ghost" className="w-full justify-start">
              Articles
            </Button>
          </Link>
          <Link href="/admin/visitors">
            <Button variant="ghost" className="w-full justify-start">
              Visitors
            </Button>
          </Link>
          <Link href="/admin/footer">
            <Button variant="ghost" className="w-full justify-start">
              Footer Config
            </Button>
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <div className="mb-4 text-sm">
            <p className="text-muted-foreground">Logged in as:</p>
            <p className="font-medium text-foreground">{session.user.name}</p>
          </div>
          <form
            action={async () => {
              'use server'
              await auth.api.signOut({ headers: await headers() })
              redirect('/sign-in')
            }}
          >
            <Button type="submit" variant="outline" className="w-full">
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
