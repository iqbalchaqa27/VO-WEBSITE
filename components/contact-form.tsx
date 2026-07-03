'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createVisitor } from '@/app/actions/visitors'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'contact',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await createVisitor(formData)
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        type: 'contact',
      })
      
      // Reset submitted message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('Gagal mengirim pesan. Silakan coba lagi.')
      console.error('Form submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Terima kasih! Pesan Anda telah dikirim. Kami akan segera menghubungi Anda.
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
          disabled={loading}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="type">Tipe Pertanyaan</Label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value })
          }
          disabled={loading}
          className="w-full px-3 py-2 border border-input rounded-md text-sm"
        >
          <option value="contact">Pertanyaan Umum</option>
          <option value="donation">Pertanyaan Donasi</option>
          <option value="event">Pertanyaan Event</option>
          <option value="other">Lainnya</option>
        </select>
      </div>

      <div>
        <Label htmlFor="message">Pesan</Label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
          disabled={loading}
          rows={5}
          className="w-full px-3 py-2 border border-input rounded-md text-sm"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Mengirim...' : 'Kirim Pesan'}
      </Button>
    </form>
  )
}
