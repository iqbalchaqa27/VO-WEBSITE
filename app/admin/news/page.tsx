'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from '@/app/actions/news'

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    imageUrl: '',
    excerpt: '',
    published: false,
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    loadNews()
  }, [])

  async function loadNews() {
    setLoading(true)
    try {
      const data = await getNews()
      setNewsList(data)
    } catch (error) {
      console.error('Failed to load news:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingId) {
        await updateNews(editingId, formData)
        setEditingId(null)
      } else {
        await createNews(formData)
      }
      setFormData({
        title: '',
        slug: '',
        content: '',
        imageUrl: '',
        excerpt: '',
        published: false,
      })
      loadNews()
    } catch (error) {
      console.error('Failed to save news:', error)
    }
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure?')) {
      try {
        await deleteNews(id)
        loadNews()
      } catch (error) {
        console.error('Failed to delete news:', error)
      }
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-foreground mb-8">Manage News</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {editingId ? 'Edit News' : 'Add New News'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-input rounded-md text-sm"
                  rows={5}
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="published"
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <Label htmlFor="published" className="mb-0">
                  Published
                </Label>
              </div>
              <Button type="submit" className="w-full">
                {editingId ? 'Update' : 'Create'}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({
                      title: '',
                      slug: '',
                      content: '',
                      imageUrl: '',
                      excerpt: '',
                      published: false,
                    })
                  }}
                >
                  Cancel
                </Button>
              )}
            </form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              All News
            </h2>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : newsList.length === 0 ? (
              <p className="text-muted-foreground">No news yet</p>
            ) : (
              <div className="space-y-4">
                {newsList.map((item) => (
                  <div
                    key={item.id}
                    className="border border-border rounded-lg p-4 flex justify-between items-start"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.excerpt}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.published ? 'Published' : 'Draft'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingId(item.id)
                          setFormData({
                            title: item.title,
                            slug: item.slug,
                            content: item.content,
                            imageUrl: item.imageUrl || '',
                            excerpt: item.excerpt || '',
                            published: item.published,
                          })
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
