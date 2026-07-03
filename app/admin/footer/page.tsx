'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function FooterPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-foreground mb-8">
        Footer Configuration
      </h1>

      <Card className="p-6">
        <form className="space-y-6 max-w-2xl">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="+62-21-XXXX" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="info@ikaq.org" />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <textarea
              id="address"
              defaultValue="Jabodetabek, Indonesia"
              className="w-full px-3 py-2 border border-input rounded-md text-sm"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook URL</Label>
            <Input id="facebook" defaultValue="https://facebook.com/ikaq" />
          </div>
          <div>
            <Label htmlFor="instagram">Instagram URL</Label>
            <Input id="instagram" defaultValue="https://instagram.com/ikaq" />
          </div>
          <div>
            <Label htmlFor="youtube">YouTube URL</Label>
            <Input id="youtube" defaultValue="https://youtube.com/ikaq" />
          </div>
          <Button type="submit" className="w-full">
            Save Footer Configuration
          </Button>
        </form>
      </Card>
    </div>
  )
}
