import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'

export const metadata = {
  title: 'Create Admin Account - IKAQ',
  description: 'Create a new admin account for IKAQ',
}

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/admin')
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-4">
        <img
          src="/images/ikaq-logo.png"
          alt="IKAQ Logo"
          className="h-16 w-auto mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-foreground">
          Create Admin Account
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          IKAQ Jabodetabek
        </p>
      </div>
      <AuthForm mode="sign-up" />
    </div>
  )
}
