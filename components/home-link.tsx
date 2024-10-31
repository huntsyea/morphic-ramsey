'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconLogo } from './ui/icons'
import { cn } from '@/lib/utils'
import { useAppState } from '@/lib/utils/app-state'

export default function HomeLink() {
  const router = useRouter()
  const { setIsGenerating } = useAppState()

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsGenerating(false)
    window.location.href = '/' // Force a full page refresh
  }

  return (
    <Link href="/" onClick={handleHomeClick}>
      <IconLogo className={cn('w-5 h-5')} />
      <span className="sr-only">Ramsey Advice POC</span>
    </Link>
  )
}
