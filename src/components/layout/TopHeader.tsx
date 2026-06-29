'use client'

import Link from 'next/link'
import { Bell, User } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

export function TopHeader() {
  const { user } = useAuthStore()

  return (
    <header className="md:hidden sticky top-0 z-40 w-full h-16 bg-background border-b border-dark flex items-center justify-between px-4">
      <Link href="/dashboard" className="flex items-center">
        <span className="font-hindi font-bold text-xl text-accent">स्वास्थ्य कोष</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-dark hover:text-primary-dark transition-colors">
          <Bell className="w-5 h-5" />
          {/* Unread badge placeholder */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </button>
        
        <Link href="/settings" className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-1 border border-dark text-muted-dark overflow-hidden">
          {user?.name ? (
            <span className="font-body font-medium text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          ) : (
            <User className="w-4 h-4" />
          )}
        </Link>
      </div>
    </header>
  )
}
