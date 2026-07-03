import { Card } from '@/components/ui/card'
import { getSliders } from '@/app/actions/sliders'
import { getNews } from '@/app/actions/news'
import { getArticles } from '@/app/actions/articles'
import { getVisitors } from '@/app/actions/visitors'

export const metadata = {
  title: 'Dashboard - Admin',
  description: 'Admin dashboard overview',
}

export default async function AdminDashboard() {
  const [sliders, newsItems, articles, visitorList] = await Promise.all([
    getSliders(),
    getNews(),
    getArticles(),
    getVisitors(),
  ])

  const stats = [
    { label: 'Sliders', value: sliders.length, href: '/admin/sliders' },
    { label: 'News', value: newsItems.length, href: '/admin/news' },
    { label: 'Articles', value: articles.length, href: '/admin/articles' },
    { label: 'Visitors', value: visitorList.length, href: '/admin/visitors' },
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold text-foreground mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <a key={stat.label} href={stat.href}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </h2>
              <p className="text-3xl font-bold text-foreground mt-2">
                {stat.value}
              </p>
            </Card>
          </a>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent News
          </h3>
          {newsItems.length === 0 ? (
            <p className="text-muted-foreground">No news yet</p>
          ) : (
            <ul className="space-y-2">
              {newsItems.slice(0, 5).map((item) => (
                <li key={item.id} className="text-sm text-foreground">
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent Visitors
          </h3>
          {visitorList.length === 0 ? (
            <p className="text-muted-foreground">No visitors yet</p>
          ) : (
            <ul className="space-y-2">
              {visitorList.slice(0, 5).map((visitor) => (
                <li key={visitor.id} className="text-sm text-foreground">
                  <p className="font-medium">{visitor.name}</p>
                  <p className="text-muted-foreground text-xs">{visitor.email}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
