'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  getSliders,
  createSlider,
  updateSlider,
  deleteSlider,
} from '@/app/actions/sliders'

export default function SlidersPage() {
  const [sliderList, setSliderList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    order: 0,
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    loadSliders()
  }, [])

  async function loadSliders() {
    setLoading(true)
    try {
      const data = await getSliders()
      setSliderList(data)
    } catch (error) {
      console.error('Failed to load sliders:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingId) {
        await updateSlider(editingId, formData)
        setEditingId(null)
      } else {
        await createSlider(formData)
      }
      setFormData({ title: '', description: '', imageUrl: '', link: '', order: 0 })
      loadSliders()
    } catch (error) {
      console.error('Failed to save slider:', error)
    }
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure?')) {
      try {
        await deleteSlider(id)
        loadSliders()
      } catch (error) {
        console.error('Failed to delete slider:', error)
      }
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-foreground mb-8">Manage Sliders</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {editingId ? 'Edit Slider' : 'Add New Slider'}
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
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
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
                  required
                />
              </div>
              <div>
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="order">Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) })
                  }
                />
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
                      description: '',
                      imageUrl: '',
                      link: '',
                      order: 0,
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
              All Sliders
            </h2>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : sliderList.length === 0 ? (
              <p className="text-muted-foreground">No sliders yet</p>
            ) : (
              <div className="space-y-4">
                {sliderList.map((slider) => (
                  <div
                    key={slider.id}
                    className="border border-border rounded-lg p-4 flex justify-between items-start"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {slider.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {slider.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingId(slider.id)
                          setFormData({
                            title: slider.title,
                            description: slider.description || '',
                            imageUrl: slider.imageUrl,
                            link: slider.link || '',
                            order: slider.order,
                          })
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(slider.id)}
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
