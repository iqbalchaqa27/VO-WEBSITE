'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '@/app/actions/articles'

export default function ArticlesPage() {
  const [articleList, setArticleList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    imageUrl: '',
    category: '',
    published: false,
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    loadArticles()
  }, [])

  async function loadArticles() {
    setLoading(true)
    try {
      const data = await getArticles()
      setArticleList(data)
    } catch (error) {
      console.error('Failed to load articles:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingId) {
        await updateArticle(editingId, formData)
        setEditingId(null)
      } else {
        await createArticle(formData)
      }
      setFormData({
        title: '',
        slug: '',
        content: '',
        imageUrl: '',
        category: '',
        published: false,
      })
      loadArticles()
    } catch (error) {
      console.error('Failed to save article:', error)
    }
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure?')) {
      try {
        await deleteArticle(id)
        loadArticles()
      } catch (error) {
        console.error('Failed to delete article:', error)
      }
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-foreground mb-8">Manage Articles</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {editingId ? 'Edit Article' : 'Add New Article'}
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
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
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
                      category: '',
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
              All Articles
            </h2>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : articleList.length === 0 ? (
              <p className="text-muted-foreground">No articles yet</p>
            ) : (
              <div className="space-y-4">
                {articleList.map((article) => (
                  <div
                    key={article.id}
                    className="border border-border rounded-lg p-4 flex justify-between items-start"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Category: {article.category || 'Uncategorized'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {article.published ? 'Published' : 'Draft'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingId(article.id)
                          setFormData({
                            title: article.title,
                            slug: article.slug,
                            content: article.content,
                            imageUrl: article.imageUrl || '',
                            category: article.category || '',
                            published: article.published,
                          })
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(article.id)}
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
