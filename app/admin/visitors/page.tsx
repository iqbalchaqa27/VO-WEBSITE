'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getVisitors, deleteVisitor } from '@/app/actions/visitors'

export default function VisitorsPage() {
  const [visitorList, setVisitorList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVisitors()
  }, [])

  async function loadVisitors() {
    setLoading(true)
    try {
      const data = await getVisitors()
      setVisitorList(data)
    } catch (error) {
      console.error('Failed to load visitors:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (confirm('Delete this contact submission?')) {
      try {
        await deleteVisitor(id)
        loadVisitors()
      } catch (error) {
        console.error('Failed to delete visitor:', error)
      }
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-foreground mb-8">
        Contact Submissions
      </h1>

      <Card className="p-6">
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : visitorList.length === 0 ? (
          <p className="text-muted-foreground">No submissions yet</p>
        ) : (
          <div className="space-y-4">
            {visitorList.map((visitor) => (
              <div
                key={visitor.id}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {visitor.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{visitor.email}</p>
                    {visitor.phone && (
                      <p className="text-sm text-muted-foreground">
                        {visitor.phone}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(visitor.id)}
                  >
                    Delete
                  </Button>
                </div>
                {visitor.message && (
                  <p className="text-sm text-foreground mt-2 p-3 bg-muted rounded">
                    {visitor.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Type: {visitor.type} | Date:{' '}
                  {new Date(visitor.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
